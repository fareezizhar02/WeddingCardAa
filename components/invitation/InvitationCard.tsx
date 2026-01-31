'use client';

import { motion } from 'framer-motion';
import CoverPage from './CoverPage';
import { ChevronDown } from 'lucide-react';

/**
 * InvitationCard Component
 * 
 * Centered card container with elegant styling, rounded corners,
 * and subtle shadow. Provides the main visual frame for the invitation.
 */
export default function InvitationCard() {
  // Card entrance animation - subtle fade and scale
  const cardVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

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
        bg-gradient-to-br from-cream-50 to-amber-50/30
        rounded-2xl md:rounded-2xl
        sm:rounded-none
        shadow-[0_8px_30px_rgb(139,92,46,0.12)]
        border border-amber-100/50
        sm:border-0
        overflow-hidden
        aspect-[4/5]
        h-[100dvh] max-h-[100dvh]
        sm:h-auto sm:max-h-none
      "
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none"></div>
      
      {/* Card content with elegant padding */}
      <div className="relative h-full w-full">
        <CoverPage />
      </div>

      {/* Scroll Indicator */}
{/* <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 5.8, duration: 0.8 }}
  className="
    absolute
    inset-x-0
    flex
    justify-center
    z-30
    pointer-events-none
  "
  style={{
    // ✅ naikkan dari bawah supaya tak kena BottomAppBar
    bottom: "calc(env(safe-area-inset-bottom) + 96px)",
  }}
>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    className="
      flex flex-col items-center
      px-4 py-2
      rounded-full
      bg-white/55
      backdrop-blur-md
      border border-white/40
      shadow-[0_10px_25px_rgba(0,0,0,0.10)]
      text-stone-700
    "
  >
    <span className="text-[11px] tracking-[0.32em] uppercase mb-1">
      Scroll
    </span>

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </motion.div>
</motion.div> */}


      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl"></div>
    </motion.div>
  );
}
