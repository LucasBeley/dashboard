import { z } from "zod";

export const appMetaSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  description: z.string(),
  version: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  status: z.enum([
    "planning",
    "in-progress",
    "ready",
    "deployed",
    "archived",
  ]),
  github: z
    .object({
      owner: z.string(),
      repo: z.string(),
      url: z.string().url(),
    })
    .optional(),
  deploy: z
    .object({
      method: z.string(),
      status: z.enum(["not-deployed", "deploying", "live", "failed"]),
      url: z.string().url().nullable().optional(),
    })
    .optional(),
  createdAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type AppMeta = z.infer<typeof appMetaSchema>;
