"use client"

import { motion } from "framer-motion"
import { FileText, Download, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ResumePage() {
  const [resumeExists, setResumeExists] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if resume.pdf exists
    fetch("/resume.pdf", { method: "HEAD" })
      .then((response) => {
        setResumeExists(response.ok)
      })
      .catch(() => {
        setResumeExists(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 rounded-2xl max-w-2xl w-full text-center relative z-10"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient">Resume / CV</span>
        </h1>

        {resumeExists === null ? (
          <div className="py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground mt-4">Checking for resume...</p>
          </div>
        ) : resumeExists ? (
          <>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Download my resume to learn more about my education, experience, 
              skills, and qualifications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                asChild
              >
                <a href="/resume.pdf" download="Krishiv_Katariya_Resume.pdf">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary w-full sm:w-auto"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-5 h-5 mr-2" />
                  View in Browser
                </a>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Resume not uploaded yet</span>
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              To add your resume, place your PDF file in the <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">public</code> folder 
              and name it <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">resume.pdf</code>
            </p>

            <div className="p-4 bg-secondary/50 rounded-lg text-left mb-8">
              <p className="text-sm text-muted-foreground font-mono">
                public/<br />
                └── resume.pdf
              </p>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
