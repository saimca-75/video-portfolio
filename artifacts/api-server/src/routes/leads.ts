import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { logger } from "../lib/logger";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
});

const PROJECT_LABELS: Record<string, string> = {
  short: "Short Form (Reels/TikTok)",
  long: "Long Form (YouTube/Podcast)",
  motion: "Motion Graphics",
  thumbnail: "Thumbnail Design",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-100": "Under $100",
  "100-500": "$100 – $500",
  "500-1000": "$500 – $1,000",
  "1000+": "$1,000+",
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendLeadEmail(lead: {
  name: string;
  email: string;
  whatsapp?: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  const transporter = getTransporter();
  const notifyEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  if (!transporter || !notifyEmail) {
    logger.warn("Email not configured — skipping notification");
    return;
  }

  const projectLabel = PROJECT_LABELS[lead.projectType] ?? lead.projectType;
  const budgetLabel = BUDGET_LABELS[lead.budget] ?? lead.budget;

  await transporter.sendMail({
    from: `"Portfolio Notifications" <${process.env.SMTP_USER}>`,
    to: notifyEmail,
    subject: `New Lead: ${lead.name} — ${projectLabel}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f0f17;color:#fff;border-radius:12px;overflow:hidden;">
        <div style="background:#7c3aed;padding:24px 32px;">
          <h1 style="margin:0;font-size:20px;color:#fff;">New Portfolio Lead</h1>
          <p style="margin:4px 0 0;color:#ddd6fe;font-size:14px;">Someone just filled out your contact form</p>
        </div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#a78bfa;font-weight:bold;width:120px;">Name</td><td style="padding:8px 0;color:#fff;">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#a78bfa;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:${lead.email}" style="color:#c4b5fd;">${lead.email}</a></td></tr>
            ${lead.whatsapp ? `<tr><td style="padding:8px 0;color:#a78bfa;font-weight:bold;">WhatsApp</td><td style="padding:8px 0;color:#fff;">${lead.whatsapp}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#a78bfa;font-weight:bold;">Project</td><td style="padding:8px 0;color:#fff;">${projectLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#a78bfa;font-weight:bold;">Budget</td><td style="padding:8px 0;color:#fff;">${budgetLabel}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#1a1a2e;border-radius:8px;border-left:3px solid #7c3aed;">
            <p style="margin:0;color:#a78bfa;font-size:13px;font-weight:bold;margin-bottom:8px;">Message</p>
            <p style="margin:0;color:#e2e8f0;line-height:1.6;">${lead.message}</p>
          </div>
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${lead.email}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">Reply to ${lead.name}</a>
          </div>
        </div>
      </div>
    `,
  });
}

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  req.log.info({ leadId: lead.id }, "New lead submitted");

  sendLeadEmail(parsed.data).catch((err) =>
    logger.error({ err }, "Failed to send lead email")
  );

  res.status(201).json(lead);
});

router.get("/leads", async (req, res): Promise<void> => {
  const secret = req.headers["x-admin-secret"];
  if (secret !== process.env.SESSION_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));

  logger.info({ count: leads.length }, "Admin fetched leads");
  res.json(leads);
});

export default router;
