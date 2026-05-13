'use client'

import { Canvas } from '@react-three/fiber'
import { Text, Float, Sphere, Stars, OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingText() {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
      textRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={textRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text
          position={[0, 2, 0]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Welcome to My
        </Text>
        <Text
          position={[0, 0.5, 0]}
          fontSize={1.8}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          3D Portfolio
        </Text>
        <Text
          position={[0, -1, 0]}
          fontSize={0.6}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          Interactive • Immersive • Innovative
        </Text>
      </Float>
    </group>
  )
}

function InteractiveSpheres() {
  const spheres = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]
    }))
  }, [])

  return (
    <>
      {spheres.map((sphere) => (
        <Float
          key={sphere.id}
          speed={1 + sphere.id * 0.2}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh position={sphere.position}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function HeroScene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#4ecdc4" />

      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade />

      <ParticleField />

      <FloatingText />

      <InteractiveSpheres />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroScene3D />
      </Canvas>
    </div>
  )
}