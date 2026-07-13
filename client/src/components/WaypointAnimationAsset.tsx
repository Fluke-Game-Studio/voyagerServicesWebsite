/**
 * WaypointAnimationAsset.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * FUTURE IMPLEMENTATION — Asset-based waypoint animations
 *
 * PURPOSE
 * Replace the Framer Motion JS-driven WaypointAnimation components in
 * ProcessJourney.tsx with pre-baked SVG files or looping WebM video clips.
 *
 * WHY
 * - JS animations (current) cost CPU on every frame via the WAAPI/RAF loop.
 * - Asset animations (SVGs with @keyframes, or <video> WebM) are rendered
 *   natively by the browser's compositor — zero JS overhead.
 * - Assets can be CDN-cached and never re-downloaded on repeat visits.
 * - The GSAP/Framer Motion bundles can be deferred further (or removed).
 *
 * HOW TO SWITCH
 * In ProcessJourney.tsx, change:
 *   const USE_ASSET_ANIMATIONS = false   →   true
 * Then provide the asset files (see ASSET FILES section below).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ASSET FILES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * SVG waypoint icons — place in:  /public/animations/waypoints/
 *   step-1-radar.svg
 *   step-2-network.svg
 *   step-3-ship.svg
 *   step-4-box.svg
 *   step-5-eye.svg
 *   step-6-send.svg
 *   step-7-package.svg
 *   step-8-pin.svg
 *
 * HOW TO CREATE SVG ANIMATION FILES
 * 1. Design each icon in Figma / Illustrator.
 * 2. Export as SVG.
 * 3. Add @keyframes CSS animations directly inside the <svg> <style> block.
 * 4. Use `animation-play-state: paused` for inactive state,
 *    `animation-play-state: running` for active state (controlled via CSS class).
 * 5. Tools: SVGator (https://www.svgator.com) — export animated SVG.
 *            Rive (https://rive.app) — more powerful, exports .riv + runtime.
 *            LottieFiles (https://lottiefiles.com) — JSON-based, use lottie-web.
 *
 * Globe video — place in:  /public/animations/
 *   globe-dark.webm   (dark theme, transparent background, looping, ~5s)
 *   globe-light.webm  (light theme, transparent background, looping, ~5s)
 *
 * HOW TO CREATE GLOBE VIDEO
 * Option A — Record from Three.js:
 *   Use OBS or browser screen capture. Trim to ~5s loop. Export as WebM VP9
 *   with alpha channel (transparent background).
 *   ffmpeg: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 33 -an globe-dark.webm`
 *
 * Option B — Use a 3D tool:
 *   Blender → render as PNG sequence → compile to WebM with alpha.
 *   Or use Spline (https://spline.design) — export video with transparency.
 *
 * Option C — CSS/SVG globe:
 *   A pure CSS spinning globe (sphere + meridian lines via border-radius tricks).
 *   ~0KB JS cost. See: https://codepen.io/search/pens?q=css+globe
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPLEMENTATION
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── SVG Asset waypoint icon component ───────────────────────────────────────

const WAYPOINT_SVG_PATHS = [
  '/animations/waypoints/step-1-radar.svg',
  '/animations/waypoints/step-2-network.svg',
  '/animations/waypoints/step-3-ship.svg',
  '/animations/waypoints/step-4-box.svg',
  '/animations/waypoints/step-5-eye.svg',
  '/animations/waypoints/step-6-send.svg',
  '/animations/waypoints/step-7-package.svg',
  '/animations/waypoints/step-8-pin.svg',
]

/**
 * Drop-in replacement for <WaypointAnimation> using pre-baked SVG asset files.
 *
 * Usage (in ProcessJourney.tsx, inside the waypoint map):
 *   <WaypointAnimationAsset index={i} isActive={isFilled} />
 *
 * The SVG file controls its own animation via CSS @keyframes.
 * `isActive` is forwarded as a CSS class so the SVG can use:
 *   .active { animation-play-state: running; }
 *   .inactive { animation-play-state: paused; opacity: 0.4; }
 */
export function WaypointAnimationAsset({
  index,
  isActive,
}: {
  index: number
  isActive: boolean
}) {
  return (
    <img
      src={WAYPOINT_SVG_PATHS[index % WAYPOINT_SVG_PATHS.length]}
      alt=""
      aria-hidden
      width={32}
      height={32}
      className={[
        'h-full w-full transition-opacity duration-300',
        isActive ? 'active opacity-100' : 'inactive opacity-40',
      ].join(' ')}
    />
  )
}

// ─── Video globe component ────────────────────────────────────────────────────

/**
 * Drop-in replacement for <GlobeScene> using a looping WebM video.
 * Zero Three.js, zero WebGL — just a <video> element.
 *
 * Usage (in Hero.tsx):
 *   Replace:
 *     <Suspense fallback={<GlobeSkeleton />}>
 *       <GlobeScene theme={theme} className="h-full w-full" />
 *     </Suspense>
 *   With:
 *     <GlobeVideo theme={theme} className="h-full w-full" />
 *
 * To create the WebM files see the HOW TO CREATE GLOBE VIDEO section above.
 */
export function GlobeVideo({
  theme,
  className,
}: {
  theme: 'dark' | 'light'
  className?: string
}) {
  return (
    <video
      key={theme}                        // re-mounts when theme changes
      src={`/animations/globe-${theme}.webm`}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={{ objectFit: 'cover' }}
    />
  )
}

// ─── Lottie option (if you prefer Lottie JSON animations) ────────────────────
//
// Install:  npm install lottie-react
//
// import Lottie from 'lottie-react'
// import radarAnimation from '/animations/lottie/step-1-radar.json'
//
// const LOTTIE_ANIMATIONS = [
//   () => import('/animations/lottie/step-1-radar.json'),
//   () => import('/animations/lottie/step-2-network.json'),
//   // ... etc
// ]
//
// export function WaypointLottie({ index, isActive }: { index: number; isActive: boolean }) {
//   return (
//     <Lottie
//       animationData={LOTTIE_ANIMATIONS[index]}
//       loop={isActive}
//       autoplay={isActive}
//       style={{ width: 32, height: 32 }}
//     />
//   )
// }

// ─── Rive option (most powerful, smallest file size) ─────────────────────────
//
// Install:  npm install @rive-app/react-canvas
//
// import { useRive } from '@rive-app/react-canvas'
//
// export function WaypointRive({ index, isActive }: { index: number; isActive: boolean }) {
//   const { RiveComponent, rive } = useRive({
//     src: `/animations/rive/waypoint-${index + 1}.riv`,
//     autoplay: isActive,
//   })
//   useEffect(() => {
//     if (!rive) return
//     isActive ? rive.play() : rive.pause()
//   }, [isActive, rive])
//   return <RiveComponent style={{ width: 32, height: 32 }} />
// }
