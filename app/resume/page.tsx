"use client"

import { motion } from "framer-motion"
import { FileText, Download, ArrowLeft, AlertCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function ResumePage() {
  const [resumeExists, setResumeExists] = useState<boolean | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    checkResumeExists()
  }, [])

  const checkResumeExists = async () => {
    try {
      const response = await fetch("/resume.pdf", { method: "HEAD" })
      setResumeExists(response.ok)
    } catch {
      setResumeExists(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.includes('pdf')) {
      setUploadMessage({ type: 'error', text: 'Please upload a PDF file' })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage({ type: 'error', text: 'File size exceeds 10MB limit' })
      return
    }

    await uploadResume(file)
  }

  const uploadResume = async (file: File) => {
    setIsUploading(true)
    setUploadMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/resume', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadMessage({ type: 'success', text: 'Resume uploaded successfully!' })
        setResumeExists(true)
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setUploadMessage({ type: 'error', text: data.error || 'Failed to upload resume' })
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'Upload failed. Please try again.' })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.includes('pdf')) {
        await uploadResume(file)
      } else {
        setUploadMessage({ type: 'error', text: 'Please upload a PDF file' })
      }
    }
  }

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
        ) : (
          <>
            {/* Upload Section */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Upload Your Resume</h3>
              <div className="space-y-4">
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-primary bg-primary/10' 
                      : 'border-primary/30 hover:border-primary'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF files only (max 10MB)</p>
                </div>

                {uploadMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-sm ${
                      uploadMessage.type === 'success'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {uploadMessage.text}
                  </motion.div>
                )}

                {isUploading && (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download/View Section */}
            {resumeExists && (
              <>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Your resume is ready! Download it to keep on your device or view it in your browser.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
            )}
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
