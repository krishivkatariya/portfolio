"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"

const codeSnippets = [
  "const passion = 'AI/ML';",
  "import { creativity } from 'mind';",
  "while(alive) { learn(); }",
  "export default Excellence;",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

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
        className="absolute inset-0 grid-pattern opacity-30"
        style={{ y }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/30 font-mono text-sm hidden md:block"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {["</>", "{}", "[]", "=>", "//", "**"][i]}
        </motion.div>
      ))}

      <motion.div
        className="container mx-auto px-6 relative z-10"
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
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.href = '/resume'}
            >
              <Download className="w-4 h-4 mr-2" /> Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-4 h-4 mr-2" /> Contact
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          whileHover={{ y: -3 }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-full border border-border group-hover:border-primary transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  )
}
