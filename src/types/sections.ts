import type { z } from 'zod'

import type {
  cmsSectionSchema,
  ctaSectionSchema,
  featuresSectionSchema,
  heroSectionSchema,
  pricingSectionSchema,
} from '../schemas/sections'

export type HeroSection = z.infer<typeof heroSectionSchema>
export type FeaturesSection = z.infer<typeof featuresSectionSchema>
export type PricingSection = z.infer<typeof pricingSectionSchema>
export type CtaSection = z.infer<typeof ctaSectionSchema>
export type CmsSection = z.infer<typeof cmsSectionSchema>
