import { PageBuilder } from '@/components/page-builder'
import { loadCmsPage } from '@/data/cms'

export default function HomePage() {
  const sections = loadCmsPage()

  return (
    <main>
      <PageBuilder sections={sections} />
    </main>
  )
}
