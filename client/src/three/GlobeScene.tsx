import { useMemo, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { latLngToVec3, buildArc, HUBS } from './globeMath'
import { landDots, borderSegments } from './worldData'
import type { Theme } from '@/lib/theme'

const R = 1

interface Palette {
  core: string
  dot: string
  border: string
  atmosphere: string
  arcA: string
  arcB: string
  stars: boolean
}

const PALETTES: Record<Theme, Palette> = {
  dark: { core: '#0a1526', dot: '#71b7ff', border: '#4d7cb0', atmosphere: '#4da3ff', arcA: '#4da3ff', arcB: '#22d3ee', stars: true },
  light: { core: '#cdddf2', dot: '#1a44b8', border: '#5170a6', atmosphere: '#2f6bff', arcA: '#1e40af', arcB: '#1d3557', stars: false },
}

function DotEarth({ p }: { p: Palette }) {
  const dots = useMemo(() => landDots(R * 1.008), [])
  const borders = useMemo(() => borderSegments(R * 1.003), [])

  const dotGeom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(dots, 3))
    return g
  }, [dots])

  const borderGeom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(borders, 3))
    return g
  }, [borders])

  return (
    <>
      <mesh>
        <sphereGeometry args={[R * 0.99, 64, 64]} />
        <meshStandardMaterial color={p.core} roughness={0.85} metalness={0.15} />
      </mesh>
      <lineSegments geometry={borderGeom}>
        <lineBasicMaterial color={p.border} transparent opacity={0.7} />
      </lineSegments>
      <points geometry={dotGeom}>
        <pointsMaterial color={p.dot} size={0.026} sizeAttenuation transparent opacity={1} />
      </points>
    </>
  )
}

function Atmosphere({ color }: { color: string }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color(color) } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(uColor, 1.0) * intensity;
          }
        `,
      }),
    [color],
  )
  return (
    <mesh scale={1.26}>
      <sphereGeometry args={[R, 48, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function Arc({ start, end, color, speed, offset }: { start: THREE.Vector3; end: THREE.Vector3; color: string; speed: number; offset: number }) {
  const points = useMemo(() => buildArc(start, end, 64), [start, end])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const comet = useRef<THREE.Mesh>(null)
  const reduce = useReducedMotion()

  useFrame(({ clock }) => {
    if (!comet.current) return
    const t = reduce ? 0.5 : (clock.elapsedTime * speed + offset) % 1
    comet.current.position.copy(curve.getPointAt(t))
    comet.current.scale.setScalar(0.6 + Math.sin(t * Math.PI) * 0.9)
  })

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.1} transparent opacity={0.32} />
      <mesh ref={comet}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={start}>
        <sphereGeometry args={[0.013, 10, 10]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.013, 10, 10]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Globe({ p }: { p: Palette }) {
  const arcs = useMemo(() => {
    const pairs: [number, number][] = [
      [1, 5],
      [0, 4],
      [2, 10],
      [3, 7],
      [8, 1],
      [6, 9],
      [0, 8],
    ]
    return pairs.map(([a, b], i) => ({
      start: latLngToVec3(HUBS[a][0], HUBS[a][1], R * 1.01),
      end: latLngToVec3(HUBS[b][0], HUBS[b][1], R * 1.01),
      color: i % 3 === 0 ? p.arcB : p.arcA,
      speed: 0.12 + (i % 4) * 0.035,
      offset: (i / 7) % 1,
    }))
  }, [p])

  return (
    <group rotation={[0, -0.6, 0.08]}>
      <DotEarth p={p} />
      <Atmosphere color={p.atmosphere} />
      {arcs.map((a, i) => (
        <Arc key={i} {...a} />
      ))}
    </group>
  )
}

function Stars({ count = 700 }) {
  const ref = useRef<THREE.Points>(null)
  const reduce = useReducedMotion()
  const geom = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useFrame((_, delta) => {
    if (ref.current && !reduce) ref.current.rotation.y += delta * 0.006
  })

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#8aa0c8" size={0.02} sizeAttenuation transparent opacity={0.5} />
    </points>
  )
}

export function GlobeScene({ className, theme = 'dark' }: { className?: string; theme?: Theme }) {
  const p = PALETTES[theme]
  const reduce = useReducedMotion()

  // R3F sizes its canvas from a ResizeObserver on the container, which can
  // report 0 on first paint inside masked/absolute layouts — leaving the scene
  // unrendered until something triggers a resize. Nudge it after mount.
  useEffect(() => {
    const nudges = [30, 120, 350].map((ms) =>
      window.setTimeout(() => window.dispatchEvent(new Event('resize')), ms),
    )
    return () => nudges.forEach(clearTimeout)
  }, [])

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.35, 3.05], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={theme === 'light' ? 1.1 : 0.6} />
        <directionalLight position={[3, 2, 4]} intensity={1.4} color="#cfe3ff" />
        <directionalLight position={[-4, -1, -2]} intensity={0.5} color={p.arcB} />
        <Suspense fallback={null}>
          {p.stars && <Stars />}
          <Globe p={p} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reduce}
          autoRotateSpeed={0.5}
          rotateSpeed={0.45}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.6}
          maxPolarAngle={Math.PI - 0.6}
        />
      </Canvas>
    </div>
  )
}
