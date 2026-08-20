import { projects } from '@/data/projects'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title}  Faizan Ali`,
    description: project.description,
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
