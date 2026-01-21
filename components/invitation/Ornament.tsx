'use client';

import { motion } from 'framer-motion';

interface OrnamentProps {
  position?: 'top' | 'bottom';
  className?: string;
}

/**
 * Ornament Component
 * 
 * Reusable decorative SVG element for elegant visual separation.
 * Features a hand-drawn floral flourish with subtle animation.
 */
export default function Ornament({ position = 'top', className = '' }: OrnamentProps) {
  // Subtle shimmer animation for elegance
  const ornamentVariants = {
    initial: { 
      opacity: 0,
      scale: 0.9,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // Custom easing for elegance
      }
    }
  };

  return (
    <motion.div
      variants={ornamentVariants}
      initial="initial"
      animate="animate"
      className={`flex justify-center ${className}`}
    >
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={position === 'bottom' ? 'rotate-180' : ''}
      >
        {/* Elegant floral ornament */}
        <path
          d="M60 5 C55 15, 45 25, 35 30 C25 35, 15 35, 5 35 M60 5 C65 15, 75 25, 85 30 C95 35, 105 35, 115 35"
          stroke="#B8936E"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M60 8 C58 18, 52 28, 45 33 C38 38, 30 40, 22 40 M60 8 C62 18, 68 28, 75 33 C82 38, 90 40, 98 40"
          stroke="#D4AF77"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Center flourish */}
        <circle cx="60" cy="5" r="2.5" fill="#B8936E" opacity="0.6" />
        <circle cx="60" cy="5" r="1" fill="#F5EFE7" />
        
        {/* Small accent dots */}
        <circle cx="40" cy="28" r="1.5" fill="#D4AF77" opacity="0.4" />
        <circle cx="80" cy="28" r="1.5" fill="#D4AF77" opacity="0.4" />
        <circle cx="25" cy="35" r="1" fill="#B8936E" opacity="0.3" />
        <circle cx="95" cy="35" r="1" fill="#B8936E" opacity="0.3" />
      </svg>
    </motion.div>
  );
}
