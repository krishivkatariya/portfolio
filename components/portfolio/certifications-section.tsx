"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const certifications = [
  {
    title: "TechFest 2025 College Ambassador",
    issuer: "IIT Bombay - TechFest",
    date: "December 2024",
    credentialId: "Appreciation Certificate",
    link: "https://techfest.org",
    icon: "🎓",
    color: "from-blue-500/20 to-cyan-500/20",
    description: "College Ambassador for Asia's largest science and technology festival (Dec 22-24, 2025)"
  },
  {
    title: "Python Programming",
    issuer: "Add your certification",
    date: "2024",
    credentialId: "Add credential ID",
    link: "#",
    icon: "🐍",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Add your Python certification details"
  },
  {
    title: "Machine Learning Fundamentals",
    issuer: "Add your certification",
    date: "2024",
    credentialId: "Add credential ID",
    link: "#",
    icon: "🤖",
    color: "from-purple-500/20 to-pink-500/20",
    description: "Add your ML certification details"
  },
  {
    title: "Java Programming",
    issuer: "Add your certification",
    date: "2024",
    credentialId: "Add credential ID",
    link: "#",
    icon: "☕",
    color: "from-orange-500/20 to-red-500/20",
    description: "Add your Java certification details"
  },
  {
    title: "Web Development",
    issuer: "Add your certification",
    date: "2024",
    credentialId: "Add credential ID",
    link: "#",
    icon: "🌐",
    color: "from-blue-600/20 to-indigo-500/20",
    description: "Add your web development certification details"
  },
  {
    title: "Database Management",
    issuer: "Add your certification",
    date: "2024",
    credentialId: "Add credential ID",
    link: "#",
    icon: "🗄️",
    color: "from-yellow-500/20 to-orange-500/20",
    description: "Add your database certification details"
  }
]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certifications" className="py-32 relative" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono mb-4 block">05. Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment 
            to continuous learning.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative glass-card p-6 rounded-2xl h-full border border-transparent hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                    {cert.icon}
                  </div>
                  <Award className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Issued {cert.date}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-mono mb-4">
                  ID: {cert.credentialId}
                </p>

                {/* Action */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center group/btn"
                  asChild
                >
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Credential
                    <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LinkedIn Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://www.linkedin.com/in/krishivkatariya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              View All Certifications on LinkedIn
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
