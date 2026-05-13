'use client'

import { Canvas } from '@react-three/fiber'
import { Text, Float, Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Project3DCardProps {
  title: string
  description: string
  technologies: string[]
  image?: string
  link?: string
  position: [number, number, number]
  rotation?: [number, number, number]
}

function ProjectCard3D({
  title,
  description,
  technologies,
  image,
  link,
  position,
  rotation = [0, 0, 0]
}: Project3DCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={1} rotationIntensity={hovered ? 0.2 : 0.1} floatIntensity={hovered ? 0.3 : 0.1}>
        {/* Card Background */}
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial
            color={hovered ? "#1e1b4b" : "#0f172a"}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#312e81" : "#000000"}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </mesh>

        {/* Card Border */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.1, 2.1, 0.02]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Project Title */}
        <Text
          position={[0, 0.6, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Project Description */}
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.08}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {description}
        </Text>

        {/* Technologies */}
        <group position={[0, -0.4, 0.06]}>
          {technologies.slice(0, 3).map((tech, index) => (
            <Text
              key={tech}
              position={[0, -index * 0.15, 0]}
              fontSize={0.06}
              color="#64748b"
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          ))}
        </group>
      </Float>

      {/* HTML Overlay for Links */}
      {hovered && link && (
        <Html position={[0, -1.2, 0.1]} center>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            View Project
          </a>
        </Html>
      )}
    </group>
  )
}

function ProjectScene3D({ projects }: { projects: Project3DCardProps[] }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b6b" />

      {projects.map((project, index) => (
        <ProjectCard3D
          key={index}
          {...project}
          position={[
            (index % 3 - 1) * 4,
            Math.floor(index / 3) * -3,
            -2 - (index * 0.5)
          ]}
        />
      ))}
    </>
  )
}

export default function Projects3D({ projects }: { projects: Project3DCardProps[] }) {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ProjectScene3D projects={projects} />
      </Canvas>
    </div>
  )
}