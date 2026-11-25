import { CtaSection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { cmsSectionSchema } from '@/schemas/sections'
import type {
  CmsSection,
  CtaSection as CtaSectionData,
  FeaturesSection as FeaturesSectionData,
  HeroSection as HeroSectionData,
  PricingSection as PricingSectionData,
} from '@/types/sections'

type SectionRegistry = {
  hero: React.ComponentType<HeroSectionData>
  features: React.ComponentType<FeaturesSectionData>
  pricing: React.ComponentType<PricingSectionData>
  cta: React.ComponentType<CtaSectionData>
}

const sectionRegistry = {
  hero: ({ id, props }: HeroSectionData) => <HeroSection id={id} {...props} />,
  features: ({ id, props }: FeaturesSectionData) => <FeaturesSection id={id} {...props} />,
  pricing: ({ id, props }: PricingSectionData) => <PricingSection id={id} {...props} />,
  cta: ({ id, props }: CtaSectionData) => <CtaSection id={id} {...props} />,
} satisfies SectionRegistry

function isSupportedType(type: unknown): type is keyof SectionRegistry {
  return typeof type === 'string' && Object.hasOwn(sectionRegistry, type)
}

function InvalidSection({ message }: { message: string }) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <aside className="border-y border-ink/20 bg-canvas px-5 py-3 text-sm text-ink" role="status">
      {message}
    </aside>
  )
}

function renderSection(section: unknown, index: number) {
  const result = cmsSectionSchema.safeParse(section)

  if (!result.success) {
    const type =
      typeof section === 'object' && section !== null && 'type' in section
        ? section.type
        : undefined

    const label = isSupportedType(type) ? `"${type}" section has invalid data` : 'Unsupported section type'

    return (
      <InvalidSection
        key={index}
        message={
          process.env.NODE_ENV === 'development'
            ? `${label}. ${result.error.issues.map(({ message }) => message).join(' ')}`
            : label
        }
      />
    )
  }

  const validatedSection: CmsSection = result.data

  const Component = sectionRegistry[validatedSection.type]
  return <Component key={validatedSection.id} {...validatedSection} />
}

export function PageBuilder({ sections }: { sections: readonly unknown[] }) {
  return sections.map(renderSection)
}
