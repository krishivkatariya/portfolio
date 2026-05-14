'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const codeSnippets = [
  "const passion = 'AI/ML';",
  "import { creativity } from 'mind';",
  "while(alive) { learn(); }",
  "export default Excellence;",
]

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96])

  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet]
    let charIndex = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex <= snippet.length) {
          setDisplayText(snippet.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setIsTyping(false), 1800)
        }
      }, 45)
      return () => clearInterval(typingInterval)
    }

    const deletingInterval = setInterval(() => {
      if (displayText.length > 0) {
        setDisplayText(prev => prev.slice(0, -1))
      } else {
        clearInterval(deletingInterval)
        setCurrentSnippet(prev => (prev + 1) % codeSnippets.length)
        setIsTyping(true)
      }
    }, 30)

    return () => clearInterval(deletingInterval)
  }, [currentSnippet, displayText.length, isTyping])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 grid-pattern opacity-25"
        style={{ y }}
      />

      <motion.div
        className="absolute top-16 left-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-16 right-10 w-72 h-72 rounded-full bg-accent/10 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          className="container mx-auto px-6 relative z-30"
          style={{ opacity, scale }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 110 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for opportunities</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="block text-gradient">Krishiv</span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl font-semibold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI/ML Engineer
            </motion.p>

            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <code className="text-sm md:text-base font-mono text-primary/80 bg-primary/5 px-4 py-3 rounded-2xl inline-flex items-center gap-2 shadow-sm glass">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </code>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Passionate about AI/ML and building intelligent software solutions. Proficient in Python, Java, C++, and Django with expertise in leveraging AI tools effectively.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" /> Resume
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Mail className="w-4 h-4 mr-2" /> Contact
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
