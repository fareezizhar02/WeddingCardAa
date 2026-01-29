'use client'

import { motion } from 'framer-motion'
import MukadimahContent from './MukadimahContent'
import DetailsContent from './DetailsContent'
import AturCaraContent from './AturCaraContent'
import MenghitungHariContent from './MenghitungHariContent'
import DoaContent from './DoaContent'
import RSVPContent from './RSVPContent'
import ResponseContent from './ResponseContent'

export default function ContentCard() {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="
        relative
        w-full
        max-w-2xl
        mx-auto
        min-h-fit
        rounded-2xl
        shadow-[0_8px_30px_rgb(139,92,46,0.12)]
        border border-amber-100/50
        overflow-hidden
      "
    >
      {/* Full-card gradient background (NOW covers Mukadimah + Details) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-cream-50 via-white to-cream-100/60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_55%)]" />

      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')] opacity-40" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[560px] flex-col items-center px-6 py-12 text-center sm:py-16">
        <div className="w-full space-y-8 sm:space-y-10">
          <MukadimahContent />

          {/* Divider (same style as Mukadimah divider) */}
          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <DetailsContent />

          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <AturCaraContent />

          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <MenghitungHariContent />

          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <DoaContent />

          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <RSVPContent />

          <div className="flex items-center justify-center py-1">
            <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
          </div>

          <ResponseContent/>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-20 w-20 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-20 w-20 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl" />
    </motion.div>
  )
}
