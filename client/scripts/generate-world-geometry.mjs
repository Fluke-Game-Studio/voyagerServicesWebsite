/**
 * Build-time generator for the hero globe's geometry.
 *
 * Precomputes what `worldData.ts` used to do at runtime (≈11k spherical
 * point-in-polygon tests + topology parsing — 1-2s of main-thread jank and
 * ~350KB of atlas data in the bundle) and writes a compact JSON artifact:
 *   - dots:  flat [x,y,z,...] land points on the unit sphere
 *   - lines: country-border polylines, each a flat [x,y,z,...] array
 *
 * Re-run only if you want different density: node scripts/generate-world-geometry.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { feature, mesh } from 'topojson-client'
import { geoContains } from 'd3-geo'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

const landTopo = JSON.parse(readFileSync(require.resolve('world-atlas/land-110m.json'), 'utf8'))
const countriesTopo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-110m.json'), 'utf8'))

const land = feature(landTopo, landTopo.objects.land)
const borders = mesh(countriesTopo, countriesTopo.objects.countries) // MultiLineString

const r3 = (n) => Math.round(n * 1000) / 1000

function latLngToXyz(lat, lng) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)]
}

// --- land dots: Fibonacci sphere, keep points that fall on land ---
const SAMPLES = 11000
const golden = Math.PI * (3 - Math.sqrt(5))
const dots = []
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = golden * i
  const x = Math.cos(theta) * r
  const z = Math.sin(theta) * r
  const lat = Math.asin(y) * (180 / Math.PI)
  let lng = Math.atan2(z, -x) * (180 / Math.PI) - 180
  lng = ((((lng + 180) % 360) + 360) % 360) - 180
  if (geoContains(land, [lng, lat])) dots.push(r3(x), r3(y), r3(z))
}

// --- borders: polylines (rebuilt into GPU segment pairs at runtime) ---
const lines = borders.coordinates.map((line) =>
  line.flatMap(([lng, lat]) => latLngToXyz(lat, lng).map(r3)),
)

const out = { dots, lines }
const target = resolve(__dirname, '../src/three/worldGeometry.json')
writeFileSync(target, JSON.stringify(out))

const kb = (JSON.stringify(out).length / 1024).toFixed(0)
console.log(`worldGeometry.json written: ${dots.length / 3} dots, ${lines.length} border lines, ${kb}KB`)
