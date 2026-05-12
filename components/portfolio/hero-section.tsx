"use client"

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState, type MouseEvent } from "react"

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

  const cardRotateX = useMotionValue(0)
  const cardRotateY = useMotionValue(0)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    cardRotateY.set((x - 0.5) * 18)
    cardRotateX.set((0.5 - y) * 18)
  }

  const handleMouseLeave = () => {
    cardRotateX.set(0)
    cardRotateY.set(0)
  }
  
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
          setTimeout(() => setIsTyping(false), 2000)
        }
      }, 50)
      return () => clearInterval(typingInterval)
    } else {
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
    }
  }, [currentSnippet, isTyping, displayText.length])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden section-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 grid-pattern opacity-30"
        style={{ y }}
      />
      
      {/* 3D background planes */}
      <motion.div className="hero-plane hero-plane-1" animate={{ rotateZ: [0, 12, -12, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hero-plane hero-plane-2" animate={{ rotateZ: [0, -10, 10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hero-plane hero-plane-3" animate={{ rotateZ: [0, 8, -8, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating code particles */}
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
        className="container mx-auto px-6 relative z-10 scene scene-card"
        style={{ opacity, scale, perspective: 1200, rotateX: cardRotateX, rotateY: cardRotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block w-[560px] h-[560px] rounded-[2.5rem] glass-card-3d border border-primary/10"
          animate={{
            rotateY: [0, 18, 0, -18, 0],
            rotateX: [0, -10, 0, 10, 0],
            opacity: [0.28, 0.45, 0.28],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 shine-effect"
          >
            <motion.span 
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>

          {/* Main Title with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <motion.span 
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hi, I&apos;m{" "}
              </motion.span>
              <motion.span 
                className="inline-block text-gradient"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Krishiv
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Computer Science Student & Aspiring
            </p>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-foreground"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: "linear-gradient(90deg, var(--foreground), var(--primary), var(--foreground))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI/ML Engineer
            </motion.p>
          </motion.div>

          {/* Typewriter code snippet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8 h-8"
          >
            <code className="text-sm md:text-base font-mono text-primary/80 bg-primary/5 px-4 py-2 rounded-lg">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-primary"
              >
                |
              </motion.span>
            </code>
          </motion.div>

          {/* Description with blur-in effect */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Passionate about AI/ML and building intelligent software solutions. 
            Proficient in Python, Java, C++, and Django with expertise in leveraging 
            AI tools effectively. TechFest 2025 College Ambassador.
          </motion.p>

          {/* CTA Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow group relative overflow-hidden"
                asChild
              >
                <a href="#contact">
                  <span className="relative z-10 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary group gradient-border"
                asChild
              >
                <a href="/resume">
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links with stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: "https://github.com/krishivkatariya", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/krishivkatariya", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:krishivkatariya8116@gmail.com", icon: Mail, label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -5, rotate: index % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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
      </motion.div>
      
      {/* Side decorations */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <span className="text-xs font-mono text-muted-foreground rotate-90 origin-center whitespace-nowrap">
          Digital Experiences 2025
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>
      
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <span className="text-xs font-mono text-muted-foreground -rotate-90 origin-center whitespace-nowrap">
          DDU Nadiad
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </section>
  )
}
