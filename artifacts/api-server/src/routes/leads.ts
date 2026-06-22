import { Router, type IRouter } from "express";
import { z } from "zod";
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
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass,
    },
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

if (!transporter) {
throw new Error(
"SMTP configuration missing. Check SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS."
);
}

const notifyEmail =
process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

if (!notifyEmail) {
throw new Error("NOTIFY_EMAIL missing");
}

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);

await transporter.verify();
console.log("SMTP verified successfully");

const projectLabel =
PROJECT_LABELS[lead.projectType] ?? lead.projectType;

const budgetLabel =
BUDGET_LABELS[lead.budget] ?? lead.budget;

const ownerMail = await transporter.sendMail({
from: `"Portfolio Notifications" <${process.env.SMTP_USER}>`,
to: notifyEmail,
subject: `New Lead: ${lead.name} — ${projectLabel}`,
html: `       <h2>New Portfolio Lead</h2>       <p><strong>Name:</strong> ${lead.name}</p>       <p><strong>Email:</strong> ${lead.email}</p>       <p><strong>WhatsApp:</strong> ${lead.whatsapp ?? "-"}</p>       <p><strong>Project Type:</strong> ${projectLabel}</p>       <p><strong>Budget:</strong> ${budgetLabel}</p>       <p><strong>Message:</strong> ${lead.message}</p>
    `,
});

console.log("Owner email sent:", ownerMail.messageId);

const customerMail = await transporter.sendMail({
from: `"Chanti Studio" <${process.env.SMTP_USER}>`,
to: lead.email,
subject: "We received your project inquiry",
html: `       <h2>Hello ${lead.name}</h2>       <p>Thank you for contacting Chanti Studio.</p>       <p>We have received your inquiry and will respond within 24 hours.</p>
    `,
});

console.log("Customer email sent:", customerMail.messageId);
}

router.post("/leads", async (req, res) => {
  try {
    const parsed = createLeadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.message,
      });
    }

    console.log("Lead received:", parsed.data);

    await sendLeadEmail(parsed.data);

    logger.info(
      {
        email: parsed.data.email,
      },
      "Lead submitted successfully"
    );

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead: parsed.data,
    });
  } catch (error) {
    logger.error({ error }, "Failed to process lead");

    return res.status(500).json({
      success: false,
      error: "Failed to submit lead",
    });
  }
});

export default router;
