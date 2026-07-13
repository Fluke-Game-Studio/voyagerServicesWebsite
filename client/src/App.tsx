import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToHash } from '@/components/ScrollToHash'
import { AmbientBackground } from '@/components/AmbientBackground'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Landing } from '@/pages/Landing'
import { LoadingScreen } from '@/components/LoadingScreen'

// Lazy-load Contact — only downloaded when user navigates to /contact
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    // LazyMotion defers the animation feature bundle — keeps motion.* API intact
    <LazyMotion features={domAnimation}>
      {/* Loading screen sits on top — slides away once chunks are ready */}
      <LoadingScreen onDone={() => setLoaded(true)} />

      {/* Site renders underneath immediately; becomes interactive once loader exits */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <BrowserRouter>
          <ScrollToHash />
          <AmbientBackground />
          <ScrollProgress />
          <Navbar />
          <main>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </LazyMotion>
  )
}
