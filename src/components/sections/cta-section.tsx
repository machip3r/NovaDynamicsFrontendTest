import { useId } from 'react'

import { ActionLink } from '@/components/ui/action-link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { CtaSection as CmsCtaSection } from '@/types/sections'

type CtaSectionProps = CmsCtaSection['props'] & { id?: string }

export function CtaSection({ id, heading, description, action }: CtaSectionProps) {
  const headingId = useId()

  return (
    <section id={id} aria-labelledby={headingId} className="bg-ink py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="min-w-0 max-w-2xl">
            <SectionHeading id={headingId}>{heading}</SectionHeading>
            <p className="mt-4 max-w-[60ch] leading-relaxed wrap-anywhere text-canvas">
              {description}
            </p>
          </div>
          <div className="max-w-full md:max-w-[35%] md:shrink-0">
            <ActionLink {...action} variant="inverse" />
          </div>
        </div>
      </Container>
    </section>
  )
}
