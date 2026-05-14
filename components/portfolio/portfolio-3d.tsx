'use client'

import dynamic from 'next/dynamic'

const ThreeDScene = dynamic(() => import('./three-d-scene'), { ssr: false })
const Hero3D = dynamic(() => import('./hero-3d'), { ssr: false })
const Skills3D = dynamic(() => import('./skills-3d'), { ssr: false })

interface Skill {
  name: string
  level: number
  color: string
}

interface Portfolio3DProps {
  skills: Skill[]
}

export function Portfolio3D({ skills }: Portfolio3DProps) {
  return (
    <>
      <ThreeDScene />

      <section className="relative z-10">
        <Hero3D />
      </section>

      <section className="py-32 relative section-3d">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive 3D visualization of my technical expertise
            </p>
          </div>
          <Skills3D skills={skills} />
        </div>
      </section>
    </>
  )
}
