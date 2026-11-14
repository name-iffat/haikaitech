import { z } from 'astro/zod';

export const blogSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  lang: z.enum(['en', 'ms-MY']).default('en'),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  status: z.enum(['draft', 'in_review', 'approved', 'published']).default('draft'),
  authorId: z.string().trim().min(1).optional(),
  review: z.object({
    evidence: z.enum(['pending', 'verified']),
    disclosure: z.enum(['pending', 'cleared']),
  }).strict().optional(),
}).strict();

export const approvalSchema = z.object({
  schemaVersion: z.literal(1),
  contentId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  route: z.string(),
  decision: z.literal('approved'),
  reviewer: z.string().trim().min(1),
  approvedAt: z.iso.datetime({ offset: true }),
  digest: z.string().regex(/^sha256:[a-f0-9]{64}$/),
  checks: z.object({
    accuracy: z.literal(true),
    evidence: z.literal(true),
    disclosure: z.literal(true),
    assetRights: z.literal(true),
  }).strict(),
}).strict();

export const evidenceSchema = z.object({
  schemaVersion: z.literal(1),
  contentId: z.string(),
  summary: z.string().trim().min(1),
  claims: z.array(z.object({
    claim: z.string().trim().min(1),
    source: z.string().trim().min(1),
    checkedOn: z.iso.date(),
  }).strict()),
  // Repository-relative, public-safe assets only. Never attach private source documents.
  assets: z.array(z.string()).default([]),
}).strict();
