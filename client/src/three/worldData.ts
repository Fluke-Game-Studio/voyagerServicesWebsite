/**
 * Builds the globe's real-world geometry from Natural Earth data (bundled via
 * the `world-atlas` package, no network calls):
 *  - land dots: Fibonacci-sphere points kept only where they fall on land
 *  - country borders: coastlines + interior boundaries as line segments
 * Results are cached at module scope so theme toggles never recompute them.
 */
import { feature, mesh } from 'topojson-client'
import { geoContains } from 'd3-geo'
import landTopo from 'world-atlas/land-110m.json'
import countriesTopo from 'world-atlas/countries-110m.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const land = feature(landTopo as any, (landTopo as any).objects.land) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const borderGeo = mesh(countriesTopo as any, (countriesTopo as any).objects.countries) as any

function latLng(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

let dotCache: Float32Array | null = null
export function landDots(radius: number, samples = 11000): Float32Array {
  if (dotCache) return dotCache
  const out: number[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    const lat = Math.asin(y) * (180 / Math.PI)
    const lng = Math.atan2(z, -x) * (180 / Math.PI) - 180
    const lngNorm = ((((lng + 180) % 360) + 360) % 360) - 180
    if (geoContains(land, [lngNorm, lat])) {
      out.push(x * radius, y * radius, z * radius)
    }
  }
  dotCache = new Float32Array(out)
  return dotCache
}

let borderCache: Float32Array | null = null
export function borderSegments(radius: number): Float32Array {
  if (borderCache) return borderCache
  const out: number[] = []
  const lines: number[][][] = borderGeo.coordinates // MultiLineString
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const a = latLng(line[i][1], line[i][0], radius)
      const b = latLng(line[i + 1][1], line[i + 1][0], radius)
      out.push(...a, ...b)
    }
  }
  borderCache = new Float32Array(out)
  return borderCache
}
