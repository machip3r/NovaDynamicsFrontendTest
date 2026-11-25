import { CtaSection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { PricingSection } from '@/components/sections/pricing-section'
import type { CmsSection } from '@/types/sections'

export function RenderSection({ section }: { section: CmsSection }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection id={section.id} {...section.props} />
    case 'features':
      return <FeaturesSection id={section.id} {...section.props} />
    case 'pricing':
      return <PricingSection id={section.id} {...section.props} />
    case 'cta':
      return <CtaSection id={section.id} {...section.props} />
  }
}
