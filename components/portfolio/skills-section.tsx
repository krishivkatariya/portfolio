"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Server, Layout, Database, Wrench, Brain } from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["Java", "C++", "Python", "SQL", "JavaScript", "HTML/CSS"]
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "from-purple-500 to-pink-500",
    skills: ["HTML5", "CSS3", "React", "Tailwind CSS", "Bootstrap", "Responsive Design"]
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-orange-500 to-red-500",
    skills: ["Django", "Python Flask", "REST APIs", "Node.js", "Express", "FastAPI"]
  },
  {
    title: "Database",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Database Design", "Query Optimization"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-yellow-500 to-orange-500",
    skills: ["Git", "Jupyter Notebooks", "Linux", "Figma", "VS Code", "Docker"]
  },
  {
    title: "AI/ML Tools",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
    skills: ["ChatGPT/GPT-4", "Claude AI", "Midjourney", "GitHub Copilot", "NumPy/Pandas", "Scikit-learn"]
  }
]

function SkillCard({ 
  category, 
  index, 
  isInView 
}: { 
  category: typeof skillCategories[0]
  index: number
  isInView: boolean 
}) {
  const IconComponent = category.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all duration-300"
    >
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.title}
        </h3>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
            whileHover={{ 
              scale: 1.1, 
              y: -3,
              boxShadow: "0 10px 20px -10px rgba(96, 165, 250, 0.3)"
            }}
            className="px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg cursor-default hover:bg-primary/20 hover:text-primary transition-all duration-200"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono mb-4 block">03. Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the technologies 
            I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h4 className="text-lg font-semibold text-foreground mb-6">Other Technologies & Concepts</h4>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Machine Learning", "Data Structures", "Algorithms", "OOP",
              "Problem Solving", "Data Analysis", "API Integration", "Prompt Engineering",
              "Version Control", "Debugging", "Agile", "Documentation",
              "Unit Testing", "UI/UX Basics", "CLI Tools", "Data Visualization"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.02 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -4,
                  backgroundColor: "rgba(96, 165, 250, 0.2)"
                }}
                className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full cursor-default hover:text-primary transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
