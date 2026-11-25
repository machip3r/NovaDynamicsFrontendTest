import { useId } from 'react'

import { ActionLink } from '@/components/ui/action-link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { PricingSection as CmsPricingSection } from '@/types/sections'

type PricingSectionProps = CmsPricingSection['props'] & { id?: string }
type PricingPlan = PricingSectionProps['plans'][number]

function PlanCard({ name, description, price, features, action }: PricingPlan) {
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format(price.amount)

  return (
    <li className="flex min-w-0 flex-col rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <h3 className="text-xl font-semibold wrap-anywhere">{name}</h3>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
        <span className="min-w-0 text-4xl font-semibold tracking-tight wrap-anywhere tabular-nums">
          {amount}
        </span>
        <span className="text-sm text-muted">/ {price.interval}</span>
      </p>
      <p className="mt-2 leading-relaxed wrap-anywhere text-muted">{description}</p>

      <ul role="list" className="mt-6 space-y-3 border-t border-line pt-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-1 h-3 w-2 shrink-0 rotate-45 border-r-2 border-b-2 border-ink"
            />
            <span className="min-w-0 wrap-anywhere">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid pt-8">
        <ActionLink {...action} variant="outline" />
      </div>
    </li>
  )
}

export function PricingSection({ id, heading, plans }: PricingSectionProps) {
  const headingId = useId()

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line bg-canvas py-16 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading id={headingId}>{heading}</SectionHeading>
        </div>

        <ul
          role="list"
          className="mx-auto mt-9 grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-5 sm:mt-12"
        >
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
