import Image, { type ImageProps } from 'next/image'
import { useId } from 'react'

import { ActionLink } from '@/components/ui/action-link'
import { Container } from '@/components/ui/container'
import type { HeroSection as CmsHeroSection } from '@/types/sections'

type HeroSectionProps = CmsHeroSection['props'] & {
  id?: string
  headingAs?: 'h1' | 'h2'
  image?: Pick<ImageProps, 'src' | 'alt'>
  preloadImage?: boolean
}

export function HeroSection({
  id,
  headline,
  description,
  primaryAction,
  headingAs: Heading = 'h1',
  image,
  preloadImage = false,
}: HeroSectionProps) {
  const headingId = useId()

  return (
    <section id={id} aria-labelledby={headingId} className="bg-canvas py-20 text-ink sm:py-24 lg:py-32">
      <Container>
        <div
          className={
            image
              ? 'grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16'
              : 'mx-auto max-w-4xl text-center'
          }
        >
          <div className="min-w-0">
            <Heading
              id={headingId}
              className="text-4xl leading-[1.08] font-semibold tracking-[-0.035em] text-balance wrap-anywhere sm:text-5xl xl:text-6xl"
            >
              {headline}
            </Heading>
            <p className={`mt-6 max-w-[52ch] text-base leading-relaxed wrap-anywhere text-muted sm:text-lg ${image ? '' : 'mx-auto'}`}>
              {description}
            </p>
            <div className="mt-8">
              <ActionLink {...primaryAction} />
            </div>
          </div>

          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-paper">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={preloadImage}
                sizes="(min-width: 80rem) 35rem, (min-width: 64rem) 50vw, (min-width: 40rem) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
