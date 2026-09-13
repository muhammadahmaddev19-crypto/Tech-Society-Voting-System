import { z } from "zod";

export const voterSchema = z.object({
  name: z.string().trim().min(2).max(80),
  semester: z.string().min(1),
  department: z.string().min(1),
  section: z.string().min(1),
  rollNo: z.string().trim().regex(/^B\d+$/i, "Roll number must start with B or b.")
});

export const projectSchema = z.object({
  name: z.string().trim().min(2).max(100),
  teamName: z.string().trim().min(2).max(100),
  description: z.string().trim().min(20).max(1200),
  imageUrl: z.string().url(),
  department: z.string().min(1),
  semester: z.string().min(1),
  section: z.string().min(1),
  members: z.array(z.object({
    name: z.string().trim().min(2).max(80),
    rollNo: z.string().trim().regex(/^B\d+$/i),
    semester: z.string().min(1),
    section: z.string().min(1),
    department: z.string().min(1)
  })).min(1).max(10)
});
