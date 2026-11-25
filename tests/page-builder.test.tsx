import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PageBuilder } from '@/components/page-builder'
import type { CmsSection } from '@/types/sections'

const hero: CmsSection = {
  id: 'hero',
  type: 'hero',
  props: {
    headline: 'A headline from the CMS',
    description: 'A description from the CMS',
    primaryAction: { label: 'Explore plans', href: '#pricing' },
  },
}

const features: CmsSection = {
  id: 'features',
  type: 'features',
  props: {
    heading: 'Features from the CMS',
    items: [{ title: 'A feature', description: 'Its description' }],
  },
}

const cta: CmsSection = {
  id: 'cta',
  type: 'cta',
  props: {
    heading: 'CTA from the CMS',
    description: 'A final invitation',
    action: { label: 'Contact the team', href: '/contact' },
  },
}

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
})

describe('PageBuilder', () => {
  it('renders a supported section and passes its content and action props through', () => {
    render(<PageBuilder sections={[hero]} />)

    expect(screen.getByRole('heading', { level: 1, name: hero.props.headline })).toBeVisible()
    expect(screen.getByText(hero.props.description)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Explore plans' })).toHaveAttribute('href', '#pricing')
  })

  it('renders multiple supported section types', () => {
    render(<PageBuilder sections={[hero, features, cta]} />)

    expect(screen.getByRole('heading', { name: hero.props.headline })).toBeVisible()
    expect(screen.getByRole('heading', { name: features.props.heading })).toBeVisible()
    expect(screen.getByRole('heading', { name: cta.props.heading })).toBeVisible()
  })

  it('renders supported sections in the input order', () => {
    const { container } = render(<PageBuilder sections={[cta, hero, features]} />)
    const renderedSectionIds = Array.from(container.querySelectorAll(':scope > section'), (section) => section.id)

    expect(renderedSectionIds).toEqual(['cta', 'hero', 'features'])
  })

  it('passes nested feature props through to their rendered content', () => {
    render(<PageBuilder sections={[features]} />)

    expect(screen.getByRole('heading', { name: 'A feature' })).toBeVisible()
    expect(screen.getByText('Its description')).toBeVisible()
  })

  it('shows a development fallback for an unknown component type', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<PageBuilder sections={[{ id: 'slider', type: 'slider', props: {} }]} />)

    expect(screen.getByRole('status')).toHaveTextContent('Unsupported section type')
  })

  it('keeps supported sections around an unknown component', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<PageBuilder sections={[hero, { id: 'slider', type: 'slider', props: {} }, cta]} />)

    expect(screen.getByRole('heading', { name: hero.props.headline })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('Unsupported section type')
    expect(screen.getByRole('heading', { name: cta.props.heading })).toBeVisible()
  })

  it('shows a fallback for each of multiple unknown component types', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<PageBuilder sections={[{ type: 'slider' }, { type: 'video' }]} />)

    expect(screen.getAllByRole('status')).toHaveLength(2)
  })

  it.each([
    ['missing props', { id: 'bad', type: 'hero' }],
    ['invalid props', { id: 'bad', type: 'hero', props: { headline: '', description: 5 } }],
  ])('shows a development fallback for %s', (_name, section) => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<PageBuilder sections={[hero, section, cta]} />)

    expect(screen.getByRole('heading', { name: hero.props.headline })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('invalid data')
    expect(screen.getByRole('heading', { name: cta.props.heading })).toBeVisible()
  })

  it('renders nothing for an empty array', () => {
    const { container } = render(<PageBuilder sections={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('continues rendering valid components across a mix of valid, invalid, and unknown sections', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<PageBuilder sections={[hero, { id: 'bad', type: 'features', props: {} }, { type: 'slider' }, cta]} />)

    expect(screen.getByRole('heading', { name: hero.props.headline })).toBeVisible()
    expect(screen.getAllByRole('status')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: cta.props.heading })).toBeVisible()
  })

  it('skips unsupported and invalid sections in production', () => {
    vi.stubEnv('NODE_ENV', 'production')
    render(<PageBuilder sections={[hero, { type: 'slider' }, { id: 'bad', type: 'cta', props: {} }, cta]} />)

    expect(screen.getByRole('heading', { name: hero.props.headline })).toBeVisible()
    expect(screen.getByRole('heading', { name: cta.props.heading })).toBeVisible()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByText('Unsupported section type')).not.toBeInTheDocument()
  })
})
