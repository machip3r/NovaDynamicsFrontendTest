import { z } from 'zod'

import { cmsSectionSchema } from '../schemas/sections'
import type { CmsSection } from '../types/sections'
import data from './data.json'

const cmsResponseSchema = z.array(z.unknown(), 'Expected an array of CMS sections.')

type CmsValidationResult = {
  sections: CmsSection[]
  issues: { path: PropertyKey[]; message: string }[]
}

export function validateCmsSections(input: unknown): CmsValidationResult {
  const response = cmsResponseSchema.safeParse(input)
  const sections: CmsSection[] = []
  const issues: CmsValidationResult['issues'] = []

  if (!response.success) {
    return {
      sections,
      issues: response.error.issues.map(({ path, message }) => ({ path, message })),
    }
  }

  const seenIds = new Set<string>()

  for (const [index, section] of response.data.entries()) {
    const result = cmsSectionSchema.safeParse(section)

    if (!result.success) {
      for (const { path, message } of result.error.issues) {
        issues.push({ path: [index, ...path], message })
      }
      continue
    }

    const { id } = result.data

    if (seenIds.has(id)) {
      issues.push({ path: [index, 'id'], message: 'Section IDs must be unique.' })
      continue
    }

    seenIds.add(id)
    sections.push(result.data)
  }

  return { sections, issues }
}

export function loadCmsPage(): CmsValidationResult {
  return validateCmsSections(data)
}
