import * as THREE from 'three'

/** Even point distribution over a sphere (Fibonacci sphere) for the dot-grid earth. */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const points = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points[i * 3] = Math.cos(theta) * r * radius
    points[i * 3 + 1] = y * radius
    points[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return points
}

/** Convert lat/long (degrees) to a point on a sphere of the given radius. */
export function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Great-circle arc between two points on a sphere, lifted off the surface at
 * its midpoint so it reads as a flight/shipping route.
 */
export function buildArc(start: THREE.Vector3, end: THREE.Vector3, segments = 64): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const radius = start.length()
  const angle = start.angleTo(end)
  const lift = 0.18 + angle * 0.16 // longer routes bow out more
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    // spherical interpolation, then push outward with a sine bump
    const point = new THREE.Vector3().copy(start).lerp(end, t).normalize()
    const altitude = radius * (1 + Math.sin(Math.PI * t) * lift)
    point.multiplyScalar(altitude)
    points.push(point)
  }
  return points
}

/** A handful of real-ish global trade hubs (lat, lng) to route arcs between. */
export const HUBS: [number, number][] = [
  [40.7, -74.0], // New York
  [34.0, -118.2], // Los Angeles
  [29.8, -95.4], // Houston
  [41.8, -87.6], // Chicago
  [51.5, -0.1], // London
  [31.2, 121.5], // Shanghai
  [1.35, 103.8], // Singapore
  [35.7, 139.7], // Tokyo
  [19.4, -99.1], // Mexico City
  [52.4, 4.9], // Amsterdam
  [25.2, 55.3], // Dubai
]
