import { useId } from 'react'

import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { FeaturesSection as CmsFeaturesSection } from '@/types/sections'

type FeaturesSectionProps = CmsFeaturesSection['props'] & { id?: string }

export function FeaturesSection({ id, heading, items }: FeaturesSectionProps) {
  const headingId = useId()

  return (
    <section id={id} aria-labelledby={headingId} className="bg-paper py-16 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-xl">
          <SectionHeading id={headingId}>{heading}</SectionHeading>
        </div>

        <ul role="list" className="mt-9 grid gap-x-8 gap-y-8 sm:mt-12 sm:grid-cols-2 md:grid-cols-3">
          {items.map(({ title, description }, index) => (
            <li key={index} className="border-t border-line pt-5">
              <h3 className="text-lg leading-snug font-semibold wrap-anywhere">{title}</h3>
              <p className="mt-2 max-w-[55ch] leading-relaxed wrap-anywhere text-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
