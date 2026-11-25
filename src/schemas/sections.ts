import { z } from 'zod'

const textSchema = z.string().regex(/^[^\u0000-\u001f\u007f]*$/, 'Control characters are not allowed.').trim().min(1)
const webUrlSchema = z.httpUrl()
const localHrefPattern = /^(?:\/(?!\/)|#(?=\S))[^\s\\]*$/

const actionSchema = z.object({
  label: textSchema,
  href: textSchema.refine(
    (href) =>
      (!/%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(href) && localHrefPattern.test(href)) ||
      (/^https?:\/\//i.test(href) && webUrlSchema.safeParse(href).success),
    'Use a root-relative path, a page anchor, or an HTTP(S) URL.',
  ),
})

const sectionBaseSchema = z.object({
  id: textSchema,
})

const featureSchema = z.object({
  title: textSchema,
  description: textSchema,
})

const planSchema = z.object({
  name: textSchema,
  description: textSchema,
  price: z.object({
    amount: z.number().nonnegative(),
    currency: z.string().regex(/^[A-Z]{3}$/, 'Use a three-letter currency code.'),
    interval: z.enum(['month', 'year']),
  }),
  features: z.array(textSchema).min(1),
  action: actionSchema,
})

export const heroSectionSchema = sectionBaseSchema.extend({
  type: z.literal('hero'),
  props: z.object({
    headline: textSchema,
    description: textSchema,
    primaryAction: actionSchema,
  }),
})

export const featuresSectionSchema = sectionBaseSchema.extend({
  type: z.literal('features'),
  props: z.object({
    heading: textSchema,
    items: z.array(featureSchema).min(1),
  }),
})

export const pricingSectionSchema = sectionBaseSchema.extend({
  type: z.literal('pricing'),
  props: z.object({
    heading: textSchema,
    plans: z.array(planSchema).min(1),
  }),
})

export const ctaSectionSchema = sectionBaseSchema.extend({
  type: z.literal('cta'),
  props: z.object({
    heading: textSchema,
    description: textSchema,
    action: actionSchema,
  }),
})

export const cmsSectionSchema = z.discriminatedUnion(
  'type',
  [heroSectionSchema, featuresSectionSchema, pricingSectionSchema, ctaSectionSchema],
  {
    error: (issue) => {
      if (issue.code === 'invalid_union') {
        return 'Provide a supported section type.'
      }
    },
  },
)
