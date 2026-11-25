import { describe, expect, it } from 'vitest'
import { cmsSectionSchema } from '@/schemas/sections'
import data from '@/data/data.json'

function heroWithHref(href: string) {
  return {
    id: 'hero', type: 'hero',
    props: {
      headline: 'Title', description: 'Description',
      primaryAction: { label: 'Continue', href },
    },
  }
}

describe('CMS section schemas', () => {
  it('accepts each section of the current CMS fixture', () => {
    for (const section of data) expect(cmsSectionSchema.safeParse(section).success).toBe(true)
  })

  it.each(['/contact', '#pricing', 'https://example.com/plans', 'http://example.com'])(
    'accepts supported href %s', (href) => {
      expect(cmsSectionSchema.safeParse(heroWithHref(href)).success).toBe(true)
    },
  )

  it.each(['javascript:alert(1)', 'data:text/html,test', '//example.com', '/\\example.com',
    '/bad\npath', '/bad%0apath', '/bad%5cpath', '', '#'])(
    'rejects unsafe or malformed href %j', (href) => {
      expect(cmsSectionSchema.safeParse(heroWithHref(href)).success).toBe(false)
    },
  )

  it('rejects control characters in content', () => {
    const section = heroWithHref('/contact')
    section.props.headline = 'Title\u0000'
    expect(cmsSectionSchema.safeParse(section).success).toBe(false)
  })

  it.each([undefined, null, { type: 'slider' }, { id: 'hero', type: 'hero' }])(
    'rejects invalid sections %j', (section) => {
      expect(cmsSectionSchema.safeParse(section).success).toBe(false)
    },
  )
})
