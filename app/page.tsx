import { Navigation } from "@/components/portfolio/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { EducationSection } from "@/components/portfolio/education-section"
import { CertificationsSection } from "@/components/portfolio/certifications-section"
import { GitHubStatsSection } from "@/components/portfolio/github-stats-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <GitHubStatsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
