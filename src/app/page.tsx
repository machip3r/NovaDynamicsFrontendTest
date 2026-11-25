import { RenderSection } from '@/components/sections/render-section'
import { loadCmsPage } from '@/data/cms'

export default function HomePage() {
  const { sections } = loadCmsPage()

  return (
    <main>
      {sections.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </main>
  )
}
