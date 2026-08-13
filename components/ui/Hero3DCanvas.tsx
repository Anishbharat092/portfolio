'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const outerRingRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.35
    outerRingRef.current.rotation.z -= delta * 0.2
    outerRingRef.current.rotation.x += delta * 0.1
  })

  return (
    <Float speed={2.5} rotationIntensity={1.8} floatIntensity={2.2}>
      {/* Central Holographic Core */}
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#9333ea"
          emissive="#c084fc"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.85}
          distort={0.38}
          speed={2.2}
          wireframe
        />
      </mesh>

      {/* Outer Gyroscope Ring */}
      <mesh ref={outerRingRef} scale={2.2}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function Hero3DCanvas() {
  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#818cf8" />
        
        <RotatingShape />
        
        <Sparkles count={100} scale={7} size={2.8} speed={0.5} color="#c084fc" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
      </Canvas>
    </div>
  )
}