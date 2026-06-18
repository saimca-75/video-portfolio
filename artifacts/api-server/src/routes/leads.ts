import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
});

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  req.log.info({ leadId: lead.id }, "New lead submitted");
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
