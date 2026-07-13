import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToHash } from '@/components/ScrollToHash'
import { AmbientBackground } from '@/components/AmbientBackground'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Landing } from '@/pages/Landing'
import { Contact } from '@/pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <AmbientBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
