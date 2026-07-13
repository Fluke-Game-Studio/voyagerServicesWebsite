import { Hero } from '@/sections/Hero'
import { Gap } from '@/sections/Gap'
import { Market } from '@/sections/Market'
import { ControlTower } from '@/sections/ControlTower'
import { Process } from '@/sections/Process'
import { Services } from '@/sections/Services'
import { WhyVoyager } from '@/sections/WhyVoyager'
import { Audiences } from '@/sections/Audiences'
import { CTA } from '@/sections/CTA'

export function Landing() {
  return (
    <>
      <Hero />
      <Gap />
      <Market />
      <ControlTower />
      <Process />
      <Services />
      <WhyVoyager />
      <Audiences />
      <CTA />
    </>
  )
}
