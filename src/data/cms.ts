import { z } from 'zod'

import data from './data.json'

const cmsResponseSchema = z.array(z.unknown(), 'Expected an array of CMS sections.')

export function loadCmsPage(): readonly unknown[] {
  const response = cmsResponseSchema.safeParse(data)
  return response.success ? response.data : []
}

