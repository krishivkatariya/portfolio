import { Navigation } from "@/components/portfolio/navigation"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { EducationSection } from "@/components/portfolio/education-section"
import { CertificationsSection } from "@/components/portfolio/certifications-section"
import { GitHubStatsSection } from "@/components/portfolio/github-stats-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { Portfolio3D } from "@/components/portfolio/portfolio-3d"


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
      {/* 3D Portfolio Sections */}
      <Portfolio3D skills={skills} />

      {/* Navigation */}
      <Navigation />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

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
