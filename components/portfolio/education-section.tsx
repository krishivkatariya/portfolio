"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { GraduationCap, Calendar, MapPin, Award, BookOpen, ChevronRight } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Dharmsinh Desai University (DDU)",
    location: "Nadiad, Gujarat",
    duration: "2024 - 2028",
    status: "Currently Pursuing",
    completionDate: "2028-05-01",
    highlights: [
      "Computer Science Engineering",
      "Focus on AI/ML and Software Development",
      "TechFest 2025 College Ambassador"
    ],
    color: "from-blue-500 to-cyan-500",
    icon: GraduationCap
  },
  {
    degree: "Higher Secondary Education (Class 12)",
    institution: "Gangotri School",
    location: "Gondal, Rajkot, Gujarat",
    duration: "Completed",
    status: "Completed",
    highlights: [
      "Science Stream",
      "Strong foundation in Mathematics and Physics"
    ],
    color: "from-purple-500 to-pink-500",
    icon: BookOpen
  }
]

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const [courses, setCourses] = useState(() => {
    const now = new Date()

    return education.map((course) => {
      const endDate = course.completionDate ? new Date(course.completionDate) : null
      const shouldComplete = course.status === "Currently Pursuing" && endDate !== null && endDate <= now

      return {
        ...course,
        status: shouldComplete ? "Completed" : course.status
      }
    })
  })

  const [completionNotification, setCompletionNotification] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const completedCourses = education.filter((course) => {
      const endDate = course.completionDate ? new Date(course.completionDate) : null
      return course.status === "Currently Pursuing" && endDate !== null && endDate <= now
    })

    if (completedCourses.length === 0) {
      return
    }

    const notified = typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("educationCompletionNotified") || "[]") as string[]
      : []

    const coursesToNotify = completedCourses.filter((course) => !notified.includes(course.institution))

    if (coursesToNotify.length === 0) {
      return
    }

    const sendNotifications = async () => {
      try {
        await Promise.all(coursesToNotify.map((course) =>
          fetch("/api/course-completion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              degree: course.degree,
              institution: course.institution,
              completionDate: course.completionDate,
            })
          })
        ))

        const completedNames = coursesToNotify.map((course) => course.institution)
        const nextNotified = [...notified, ...completedNames]

        if (typeof window !== "undefined") {
          window.localStorage.setItem("educationCompletionNotified", JSON.stringify(nextNotified))
        }

        setCompletionNotification(
          `Notification sent for completed course${coursesToNotify.length > 1 ? "s" : ""}: ${completedNames.join(", ")}`
        )
      } catch (error) {
        setCompletionNotification("Unable to send course completion notification automatically.")
      }
    }

    sendNotifications()
  }, [])

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"])

  return (
    <section id="education" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div 
        className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-primary text-sm font-mono mb-4 block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            04. Education
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="text-gradient">Academic Journey</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            My educational background that has shaped my technical foundation
            and passion for computer science.
          </motion.p>

          {completionNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
            >
              {completionNotification}
            </motion.div>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />
            <motion.div 
              className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary to-transparent transform md:-translate-x-1/2 origin-top"
              style={{ height: lineHeight }}
            />

            {courses.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-8 md:left-1/2 w-4 h-4 bg-background rounded-full transform -translate-x-1/2 border-4 border-primary z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.3 + 0.2, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-2xl relative overflow-hidden group hover-lift"
                  >
                    {/* Gradient Background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0`}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div 
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <edu.icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        <motion.span 
                          className={`px-4 py-1.5 text-xs font-mono rounded-full ${
                            edu.status === "Currently Pursuing" 
                              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                              : "bg-secondary text-secondary-foreground border border-border"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {edu.status === "Currently Pursuing" && (
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                          )}
                          {edu.status}
                        </motion.span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-lg text-muted-foreground mb-5">
                        {edu.institution}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                        <motion.span 
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50"
                          whileHover={{ scale: 1.05 }}
                        >
                          <MapPin className="w-4 h-4 text-primary" />
                          {edu.location}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Calendar className="w-4 h-4 text-primary" />
                          {edu.duration}
                        </motion.span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-3">
                        {edu.highlights.map((highlight, hIndex) => (
                          <motion.div
                            key={highlight}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.3 + hIndex * 0.1 + 0.4 }}
                            className="flex items-center gap-3 text-sm text-muted-foreground group/item"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Award className="w-4 h-4 text-primary shrink-0" />
                            </motion.div>
                            <span className="group-hover/item:text-foreground transition-colors">
                              {highlight}
                            </span>
                            <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
