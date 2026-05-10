"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Brain, Wrench, Award, Rocket, ChevronRight } from "lucide-react"

const highlights = [
  {
    icon: Brain,
    title: "AI/ML Enthusiast",
    description: "Passionate about AI tools and machine learning, knowing which tool fits best for each task.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Wrench,
    title: "Full-Stack Skills",
    description: "Proficient in Java, C++, Python, Django, SQL, and web technologies.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "TechFest Ambassador",
    description: "College Ambassador for TechFest 2025, IIT Bombay - Asia's largest science & tech festival.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Always eager to explore new technologies and best practices.",
    color: "from-orange-500 to-red-500"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated background element */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
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
            transition={{ duration: 0.5 }}
          >
            01. The Profile
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-gradient">Creative Engineer</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                I&apos;m <span className="text-foreground font-semibold">Krishiv</span>, a CS student specializing in 
                <span className="text-primary"> AI/ML and Software Development</span>. I build intelligent systems 
                with Python, Java, and Django - secure, scalable, and innovative.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                I focus on building complete digital systems, from database modeling to 
                responsive interfaces. Currently pursuing Computer Science at 
                <span className="text-foreground font-semibold"> Dharmsinh Desai University, Nadiad</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                I have expertise in leveraging AI tools effectively, understanding which tool 
                works best for specific tasks. Proud <span className="text-primary">College Ambassador 
                for TechFest 2025</span> - Asia&apos;s largest science & technology festival.
              </motion.p>
            </div>

            {/* Core Stack */}
            <motion.div 
              className="mt-10 p-6 glass-card rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">Core Stack</span>
              </div>
              <p className="text-foreground font-medium">
                Java, Python, C++, Django, SQL, HTML/CSS, Git, Linux, Figma
              </p>
            </motion.div>

            {/* Education Quick Info */}
            <motion.div 
              className="mt-6 p-6 glass-card rounded-2xl group hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">Education</span>
              </div>
              <p className="text-foreground font-medium">
                B.Tech in Computer Science
              </p>
              <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                Dharmsinh Desai University - Nadiad
                <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Highlights Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 gap-5"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group cursor-default"
              >
                {/* Gradient background on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon with animated background */}
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 relative overflow-hidden"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0`}
                    whileHover={{ opacity: 0.3 }}
                  />
                  <item.icon className="w-7 h-7 text-primary relative z-10" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
