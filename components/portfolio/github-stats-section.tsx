"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useMemo, useState } from "react"
import { Github, GitCommit, Star, Users, Code2, Activity, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  topLanguages: { name: string; percentage: number; color: string }[]
}

const defaultStats: GitHubStats = {
  publicRepos: 0,
  followers: 0,
  following: 0,
  totalStars: 0,
  topLanguages: []
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
  "Other": "#6e6e6e",
}

interface ContributionDay {
  date: string
  count: number
  level: number
  weekday: number
  weekIndex: number
  title: string
}

const contributionLevelClasses = [
  "bg-slate-800",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
]

export function GitHubStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [stats, setStats] = useState<GitHubStats>(defaultStats)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [contribError, setContribError] = useState<string | null>(null)

  const fetchGitHubStats = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch user data
      const userResponse = await fetch("https://api.github.com/users/krishivkatariya")
      
      if (!userResponse.ok) {
        throw new Error("Failed to fetch GitHub data")
      }
      
      const userData = await userResponse.json()

      // Fetch repos to calculate stars and languages
      const reposResponse = await fetch("https://api.github.com/users/krishivkatariya/repos?per_page=100&sort=updated")
      
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories")
      }
      
      const reposData = await reposResponse.json()

      // Calculate total stars
      let totalStars = 0
      const languageCounts: Record<string, number> = {}
      
      if (Array.isArray(reposData)) {
        reposData.forEach((repo: { stargazers_count?: number; language?: string | null }) => {
          totalStars += repo.stargazers_count || 0
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
          }
        })
      }

      const totalReposWithLanguage = Object.values(languageCounts).reduce((a, b) => a + b, 0)
      const topLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          percentage: totalReposWithLanguage > 0 ? Math.round((count / totalReposWithLanguage) * 100) : 0,
          color: languageColors[name] || languageColors["Other"]
        }))

      setStats({
        publicRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
        following: userData.following || 0,
        totalStars,
        topLanguages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats")
    } finally {
      setLoading(false)
    }
  }

  const fetchContributions = async () => {
    setContribError(null)

    try {
      const response = await fetch("/api/github-contributions", { cache: "no-store" })
      const data = await response.json()

      if (!response.ok || !data.days) {
        throw new Error(data.error || "Failed to fetch GitHub contributions")
      }

      setContributions(data.days)
    } catch (err) {
      setContribError(err instanceof Error ? err.message : "Failed to load contribution calendar")
    }
  }

  useEffect(() => {
    fetchGitHubStats()
    fetchContributions()

    const refreshInterval = setInterval(fetchContributions, 60000)
    return () => clearInterval(refreshInterval)
  }, [])

  const weeks = useMemo(() => {
    const weekMap = new Map<number, ContributionDay[]>()

    contributions.forEach((day) => {
      const week = day.weekIndex
      if (!weekMap.has(week)) {
        weekMap.set(week, [])
      }
      weekMap.get(week)!.push(day)
    })

    return Array.from(weekMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, days]) => days.sort((a, b) => a.weekday - b.weekday))
  }, [contributions])

  const statsDisplay = [
    { icon: GitCommit, label: "Public Repos", value: stats.publicRepos },
    { icon: Star, label: "Stars Earned", value: stats.totalStars },
    { icon: Users, label: "Followers", value: stats.followers },
    { icon: Users, label: "Following", value: stats.following },
  ]

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono mb-4 block">06. Open Source</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">GitHub Activity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My contributions to open source and personal projects. 
            Stats are fetched live from my GitHub profile.
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchGitHubStats}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsDisplay.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {loading ? (
                  <span className="inline-block w-12 h-8 bg-secondary animate-pulse rounded" />
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {stat.value}
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats Cards using GitHub Readme Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">GitHub Stats</h3>
            </div>
            {/* GitHub Readme Stats Card */}
            <img
              src="https://github-readme-stats.vercel.app/api?username=krishivkatariya&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=60a5fa&icon_color=60a5fa&text_color=c9d1d9&cache_seconds=1800"
              alt="GitHub Stats"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Top Languages</h3>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 bg-secondary animate-pulse rounded" />
                ))}
              </div>
            ) : stats.topLanguages.length > 0 ? (
              <>
                {/* Language Bar */}
                <div className="h-4 rounded-full overflow-hidden flex mb-6">
                  {stats.topLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="h-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  {stats.topLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm text-foreground">{lang.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">
                        {lang.percentage}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=krishivkatariya&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=60a5fa&text_color=c9d1d9&cache_seconds=1800"
                alt="Top Languages"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            )}
          </motion.div>
        </div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-6 rounded-2xl mb-8 bg-slate-950/95 border border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Contribution Activity</h3>
              <p className="text-sm text-muted-foreground">Automatically refreshes every minute to keep the contribution heatmap up to date.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-slate-950 p-4 border border-slate-800">
            {contributions.length > 0 ? (
              <div className="inline-flex gap-1 py-3">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-1">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        className={`h-3 w-3 rounded-sm border border-slate-800 ${contributionLevelClasses[day.level]}`}
                        title={day.title}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : contribError ? (
              <div className="rounded-2xl bg-slate-900 p-6 text-sm text-muted-foreground">
                {contribError}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, week) => (
                  <div key={week} className="space-y-2">
                    {Array.from({ length: 24 }).map((__, day) => (
                      <div
                        key={`${week}-${day}`}
                        className="h-3 w-3 rounded-sm bg-slate-800 animate-pulse"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2 text-[11px] text-muted-foreground">
            <div className="col-span-2 flex items-center gap-2">
              <span className="font-medium">Intensity</span>
              <span className="text-slate-500">(less to more activity)</span>
            </div>
            {contributionLevelClasses.map((cls, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-sm border border-slate-800 ${cls}`} />
                <span>{index === 0 ? "None" : index === 1 ? "Low" : index === 2 ? "Medium" : index === 3 ? "High" : "Peak"}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <a
              href="https://github.com/krishivkatariya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View Full GitHub Profile
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
