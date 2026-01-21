'use client';

import { motion } from 'framer-motion';
import InvitationContent from './InvitationContent';

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
        rounded-2xl
        shadow-[0_8px_30px_rgb(139,92,46,0.12)]
        border border-amber-100/50
        overflow-hidden
      "
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')] opacity-40 pointer-events-none"></div>
      
      {/* Card content with elegant padding */}
      <div className="relative px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20">
        <InvitationContent />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl"></div>
    </motion.div>
  );
}
