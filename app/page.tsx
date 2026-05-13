import { Navigation } from "@/components/portfolio/navigation"
import { Hero3D } from "@/components/portfolio/hero-3d"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { Skills3D } from "@/components/portfolio/skills-3d"
import { EducationSection } from "@/components/portfolio/education-section"
import { CertificationsSection } from "@/components/portfolio/certifications-section"
import { GitHubStatsSection } from "@/components/portfolio/github-stats-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { ThreeDScene } from "@/components/portfolio/three-d-scene"

export default function PortfolioPage() {
  const skills = [
    { name: 'React', level: 90, color: '#61dafb' },
    { name: 'TypeScript', level: 85, color: '#3178c6' },
    { name: 'Next.js', level: 88, color: '#000000' },
    { name: 'Three.js', level: 75, color: '#049ef4' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'Python', level: 82, color: '#3776ab' },
    { name: 'JavaScript', level: 92, color: '#f7df1e' },
    { name: 'CSS', level: 85, color: '#1572b6' }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden three-d-scene relative">
      {/* 3D Background Scene */}
      <ThreeDScene />

      {/* Navigation */}
      <Navigation />

      {/* 3D Hero Section */}
      <section className="relative z-10">
        <Hero3D />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* 3D Skills Section */}
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

      {/* Education Section */}
      <EducationSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* GitHub Stats Section */}
      <GitHubStatsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
