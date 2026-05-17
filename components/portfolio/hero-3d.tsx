'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function SimpleScene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={true} />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SimpleScene3D />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to My 3D Portfolio</h1>
          <p className="text-xl text-gray-300">Interactive • Immersive • Innovative</p>
        </div>
      </div>
    </div>
  )
}