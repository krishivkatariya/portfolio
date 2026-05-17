"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

const languageColors: Record<string, string> = {
  "TypeScript": "#3178c6",
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "Java": "#b07219",
  "C++": "#f34b7d",
  "C": "#555555",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
  "Shell": "#89e051",
  "Dart": "#00B4AB",
}

function ProjectCard({
  project,
  index,
  isInView
}: {
  project: GitHubRepo
  index: number
  isInView: boolean
}) {
  const languageColor = project.language ? languageColors[project.language] || "#6e6e6e" : "#6e6e6e"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group relative glass-card rounded-2xl overflow-hidden"
    >
      {/* Image Placeholder with Gradient */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-4xl">
              {project.language === "Python" ? "🐍" :
                project.language === "Java" ? "☕" :
                  project.language === "JavaScript" ? "🟨" :
                    project.language === "TypeScript" ? "🔷" :
                      project.language === "HTML" ? "🌐" :
                        project.language === "C++" ? "⚡" : "💻"}
            </span>
          </motion.div>
        </div>

        {/* Language Badge */}
        {project.language && (
          <Badge
            className="absolute top-4 right-4 border-0"
            style={{ backgroundColor: languageColor, color: "white" }}
          >
            {project.language}
          </Badge>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Button size="sm" variant="outline" asChild>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          {project.homepage && (
            <Button size="sm" asChild>
              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.name === "virtual-mouce"
            ? "virtual mouse"
            : project.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description || "A project by Krishiv Katariya"}
        </p>

        {/* Topics/Tags */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {project.forks_count}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/krishivkatariya/repos?sort=updated&per_page=100"
        )

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data: GitHubRepo[] = await response.json()
        const allowedRepos = [
          "Hopin",
          "portfolio",
          "virtual-mouce",
          "watchhub",
          "spproject",
        ]

        const normalizeName = (name: string) =>
          name.toLowerCase().replace(/[-_ ]/g, "")

        const allowedSet = new Set(allowedRepos.map(normalizeName))

        const filteredProjects = data
          .filter(repo => !repo.name.includes(".github"))
          .filter(repo => allowedSet.has(normalizeName(repo.name)))

        const orderedProjects = filteredProjects.sort((a, b) => {
          return (
            allowedRepos.indexOf(
              allowedRepos.find(name => normalizeName(name) === normalizeName(a.name)) || ""
            ) -
            allowedRepos.indexOf(
              allowedRepos.find(name => normalizeName(name) === normalizeName(b.name)) || ""
            )
          )
        })

        setProjects(orderedProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono mb-4 block">02. My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projects fetched directly from my GitHub. These are automatically
            updated when I push new work.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading projects from GitHub...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" asChild>
              <a href="https://github.com/krishivkatariya" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                isInView={isInView} 
              />
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/krishivkatariya?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
