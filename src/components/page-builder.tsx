import { Fragment, type ComponentType } from 'react'
import { z } from 'zod'

import { CtaSection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { PricingSection } from '@/components/sections/pricing-section'
import {
  heroSectionSchema, featuresSectionSchema, pricingSectionSchema, ctaSectionSchema,
} from '@/schemas/sections'

function registerSection<T extends { id: string; props: object }>(
  schema: z.ZodType<T>,
  Component: ComponentType<T['props'] & { id?: string }>,
) {
  return (input: unknown) => {
    const result = schema.safeParse(input)
    if (!result.success) {
      return { success: false, message: result.error.issues.map(
        ({ path, message }) => `${path.join('.')}: ${message}`,
      ).join(' ') } as const
    }
    const { id, props } = result.data
    return { success: true, id, element: <Component id={id} {...props} /> } as const
  }
}

const registry = new Map([
  ['hero', registerSection(heroSectionSchema, HeroSection)],
  ['features', registerSection(featuresSectionSchema, FeaturesSection)],
  ['pricing', registerSection(pricingSectionSchema, PricingSection)],
  ['cta', registerSection(ctaSectionSchema, CtaSection)],
])

function InvalidSection({ message }: { message: string }) {
  return process.env.NODE_ENV === 'development' ? (
    <aside role="status" className="border-y border-ink/20 bg-canvas px-5 py-3 text-sm text-ink">
      {message}
    </aside>
  ) : null
}

export function PageBuilder({ sections }: { sections: unknown }) {
  if (!Array.isArray(sections)) {
    return <InvalidSection message="Expected an array of CMS sections." />
  }
  const seenIds = new Set<string>()
  return sections.map((section: unknown, index: number) => {
    const type = typeof section === 'object' && section !== null && 'type' in section
      ? section.type : undefined
    const render = typeof type === 'string' ? registry.get(type) : undefined
    if (!render) {
      return <InvalidSection key={`invalid-${index}`} message="Unsupported section type." />
    }
    const result = render(section)
    if (!result.success) {
      return <InvalidSection key={`invalid-${index}`} message={`"${type}" section has invalid data. ${result.message}`} />
    }
    if (seenIds.has(result.id)) {
      return <InvalidSection key={`invalid-${index}`} message={`Duplicate section ID "${result.id}".`} />
    }
    seenIds.add(result.id)
    return <Fragment key={result.id}>{result.element}</Fragment>
  })
}
