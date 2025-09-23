import { z } from 'zod';

const pillArraySchema = z.array(z.string().min(1)).min(1);

const resourceSchema = z.object({
  label: z.string().min(1),
  href: z.string().url().optional(),
});

const teamMemberSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  badges: pillArraySchema.optional(),
  cardPoints: z.array(z.string().min(1)).optional(),
  highlights: z.array(z.string().min(1)).optional(),
  education: z.array(z.string().min(1)).optional(),
  experience: z.array(z.string().min(1)).optional(),
  competencies: z.array(z.string().min(1)).optional(),
  software: z.array(z.string().min(1)).optional(),
  achievements: z.array(z.string().min(1)).optional(),
  resources: z.array(resourceSchema).optional(),
  interests: z.string().optional(),
});

const pictureSchema = z
  .object({
    avif: z.string().optional(),
    webp: z.string().optional(),
    fallback: z.string().optional(),
  })
  .refine((value) => Boolean(value.avif || value.webp || value.fallback), {
    message: 'Необходимо указать хотя бы один источник изображения',
  });

const showcaseItemSchema = z.object({
  id: z.string().min(1),
  tag: z.string().min(1),
  title: z.string().min(1),
  caption: z.string().min(1),
  picture: pictureSchema,
  alt: z.string().min(1),
});

const blockSchema = z.object({
  title: z.string().min(1),
  hours: z.string().min(1),
  control: z.string().optional(),
});

const moduleSchema = z.object({
  day: z.string().min(1),
  blocks: z.array(blockSchema),
});

const leadSchema = z.object({
  price: z.string().min(1),
  schedule: z.string().min(1),
  seats: z.string().min(1),
  venue: z.string().min(1),
});

const locationSchema = z.object({
  id: z.string().min(1),
  kind: z.string().min(1),
  badge: z.string().min(1),
  address: z.string().min(1),
  caption: z.string().min(1),
  mapQuery: z.string().min(1),
});

const helpfulLinkSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  href: z.string().url(),
  icon: z.string().min(1),
});

export const contentSchema = z.object({
  benefits: pillArraySchema,
  audience: pillArraySchema,
  team: z.object({
    members: z.array(teamMemberSchema).min(1),
    showcase: z.array(showcaseItemSchema).min(1),
  }),
  modules: z.array(moduleSchema).min(1),
  lead: leadSchema,
  applyLocations: z.array(locationSchema).min(1),
  helpfulLinks: z.array(helpfulLinkSchema).min(1),
});
