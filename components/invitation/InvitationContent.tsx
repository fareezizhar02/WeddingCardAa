'use client';

import { motion } from 'framer-motion';
import Ornament from './Ornament';

/**
 * InvitationContent Component
 * 
 * Displays the wedding invitation details with elegant typography
 * and staggered fade-in animations for a sophisticated reveal.
 */
export default function InvitationContent() {
  // Container animation for staggering children
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  // Individual text element animation
  const itemVariants = {
    initial: { 
      opacity: 0,
      y: 20,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8 text-center"
    >
      {/* Top Ornament */}
      <Ornament position="top" />

      {/* Opening Text */}
      <motion.p 
        variants={itemVariants}
        className="text-sm tracking-[0.3em] uppercase text-amber-800/70 font-light"
      >
        The Wedding of
      </motion.p>

      {/* Couple Names */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-5xl md:text-6xl font-serif text-amber-900 tracking-tight">
          Fareez & Zanis
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-700/30"></div>
          <span className="text-amber-700/60 text-lg">♥</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-700/30"></div>
        </div>
      </motion.div>

      {/* Date & Time */}
      <motion.div variants={itemVariants} className="space-y-2">
        <p className="text-2xl md:text-3xl font-serif text-amber-800">
          Sabtu, 28 Mac 2026
        </p>
        <p className="text-base text-amber-700/80 tracking-wide">
          12:00 PM - 6:00 PM
        </p>
      </motion.div>

      {/* Location */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <div className="space-y-1">
          <p className="text-lg font-serif text-amber-800">
            The Garden Pavilion
          </p>
          <p className="text-sm text-amber-700/70 leading-relaxed">
            123 Rose Boulevard<br />
            Beverly Hills, CA 90210
          </p>
        </div>
      </motion.div>

      {/* Reception Info */}
      <motion.div variants={itemVariants} className="pt-4">
        <p className="text-sm text-amber-700/60 italic">
          Reception to follow
        </p>
      </motion.div>

      {/* Bottom Ornament */}
      <Ornament position="bottom" className="pt-4" />

      {/* Optional RSVP Notice */}
      <motion.p 
        variants={itemVariants}
        className="text-xs tracking-widest uppercase text-amber-700/50 pt-2"
      >
        Kindly respond by May 1st
      </motion.p>
    </motion.div>
  );
}
