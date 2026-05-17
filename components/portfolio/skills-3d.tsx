'use client'

import { Canvas } from '@react-three/fiber'
import { Text, Float, Sphere, Box, Cylinder, Octahedron } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Skill3DProps {
  name: string
  level: number
  color: string
  position: [number, number, number]
  geometry: 'sphere' | 'box' | 'cylinder' | 'octahedron'
}

function SkillObject3D({ name, level, color, position, geometry }: Skill3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)

  const geometryComponent = useMemo(() => {
    const size = 0.3 + (level / 100) * 0.4
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[size, 32, 32]} />
      case 'box':
        return <boxGeometry args={[size, size, size]} />
      case 'cylinder':
        return <cylinderGeometry args={[size, size, size * 1.5, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[size]} />
      default:
        return <sphereGeometry args={[size, 32, 32]} />
    }
  }, [geometry, level])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.5
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7 + position[1]) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.2
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group position={position}>
      <Float speed={1 + level / 50} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh ref={meshRef}>
          {geometryComponent}
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <mesh ref={textRef} position={[0, -0.8, 0]}>
        <Text
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        <Text
          position={[0, -0.15, 0]}
          fontSize={0.08}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {level}%
        </Text>
      </mesh>
    </group>
  )
}

function SkillsScene3D({ skills }: { skills: Omit<Skill3DProps, 'position'>[] }) {
  const skillObjects = useMemo(() => {
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2
      const radius = 3
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.sin(index * 0.5) * 2)

      return {
        ...skill,
        position: [x, y, z] as [number, number, number]
      }
    })
  }, [skills])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />

      {/* Central hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Skill connections */}
      {skillObjects.map((skill, index) => (
        <line key={`line-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, ...skill.position])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#64748b" opacity={0.3} transparent />
        </line>
      ))}

      {skillObjects.map((skill, index) => (
        <SkillObject3D
          key={index}
          {...skill}
          geometry={['sphere', 'box', 'cylinder', 'octahedron'][index % 4] as any}
        />
      ))}
    </>
  )
}

export default function Skills3D({ skills }: { skills: Omit<Skill3DProps, 'position'>[] }) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SkillsScene3D skills={skills} />
      </Canvas>
    </div>
  )
}