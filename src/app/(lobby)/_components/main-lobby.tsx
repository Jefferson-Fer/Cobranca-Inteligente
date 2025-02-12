'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

import FAQ from '@/app/_components/lobby/faq'
import Footer from '@/app/_components/lobby/footer'
import Functions from '@/app/_components/lobby/functions'
import Hero from '@/app/_components/lobby/hero'

export function MainLobby() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <main className="w-full flex flex-col gap-4 md:gap-12">
      <motion.div
        className="fixed top-0 inset-x-0 h-1 bg-blue-500 origin-left"
        style={{ scaleX }}
      />
      <section id="home">
        <Hero />
      </section>
      <section id="features">
        <Functions />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </main>
  )
}
