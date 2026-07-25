/**
 * Globe geometry, precomputed at build time by scripts/generate-world-geometry.mjs
 * into worldGeometry.json (land dots + country-border polylines on the unit
 * sphere). This used to parse two topojson atlases and run ~11k spherical
 * point-in-polygon tests on the main thread every visit — now it's a JSON read
 * and one multiply per vertex. Results cached at module scope.
 */
import world from './worldGeometry.json'

const { dots, lines } = world as { dots: number[]; lines: number[][] }

let dotCache: Float32Array | null = null
export function landDots(radius: number): Float32Array {
  if (dotCache) return dotCache
  const out = new Float32Array(dots.length)
  for (let i = 0; i < dots.length; i++) out[i] = dots[i] * radius
  dotCache = out
  return dotCache
}

let borderCache: Float32Array | null = null
export function borderSegments(radius: number): Float32Array {
  if (borderCache) return borderCache
  // polylines → line-segment soup (each consecutive vertex pair) for lineSegments
  let segCount = 0
  for (const line of lines) segCount += Math.max(0, line.length / 3 - 1)
  const out = new Float32Array(segCount * 6)
  let o = 0
  for (const line of lines) {
    for (let i = 0; i + 5 < line.length; i += 3) {
      out[o++] = line[i] * radius
      out[o++] = line[i + 1] * radius
      out[o++] = line[i + 2] * radius
      out[o++] = line[i + 3] * radius
      out[o++] = line[i + 4] * radius
      out[o++] = line[i + 5] * radius
    }
  }
  borderCache = out
  return borderCache
}
