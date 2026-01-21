'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Music, Calendar, MapPin } from 'lucide-react';
import ContactSheet from './ContactSheet';

type PageType = 'cover' | 'music';

interface BottomAppBarProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
}

/**
 * BottomAppBar Component
 * 
 * Fixed bottom navigation bar with four action buttons.
 * Features blur effect, elegant styling, and tap animations.
 */
export default function BottomAppBar({ currentPage, onNavigate }: BottomAppBarProps) {
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  // Button configuration
  const buttons = [
    {
      id: 'contact',
      label: 'Hubungi',
      icon: Phone,
      onClick: () => setIsContactSheetOpen(true),
    },
    {
      id: 'music',
      label: 'Muzik',
      icon: Music,
      onClick: () => onNavigate?.('music'),
      isActive: currentPage === 'music',
    },
    {
      id: 'calendar',
      label: 'Kalendar',
      icon: Calendar,
      onClick: () => console.log('Calendar clicked'),
    },
    {
      id: 'location',
      label: 'Lokasi',
      icon: MapPin,
      onClick: () => console.log('Location clicked'),
    },
  ];

  // Staggered entrance animation for buttons
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 20,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="
          fixed
          bottom-0
          left-0
          right-0
          h-16
          sm:h-20
          z-50
        "
      >
        {/* Background with blur effect */}
        <div className="
          absolute
          inset-0
          bg-white/90
          backdrop-blur-md
          border-t border-amber-100/50
          shadow-[0_-4px_20px_rgb(139,92,46,0.08)]
          rounded-t-3xl
        "></div>

        {/* Buttons container */}
        <div className="
          relative
          h-full
          max-w-7xl
          mx-auto
          px-2
          sm:px-4
          flex
          items-center
          justify-around
          gap-1
          sm:gap-2
        ">
          {buttons.map((button) => {
            const Icon = button.icon;
            const isActive = button.isActive || false;
            
            return (
              <motion.button
                key={button.id}
                variants={buttonVariants}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={button.onClick}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  flex-1
                  max-w-[120px]
                  py-2
                  px-3
                  rounded-xl
                  transition-colors
                  duration-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-300/50
                  focus:ring-offset-2
                  ${isActive 
                    ? 'bg-amber-100 text-amber-900' 
                    : 'hover:bg-amber-50 active:bg-amber-100'
                  }
                `}
                aria-label={button.label}
              >
                {/* Icon */}
                <Icon 
                  className={`
                    w-5 h-5 sm:w-6 sm:h-6 
                    transition-transform
                    ${isActive ? 'text-amber-900' : 'text-amber-700'}
                  `}
                  strokeWidth={1.5}
                />
                
                {/* Label */}
                <span className={`
                  text-[10px]
                  sm:text-xs
                  font-medium
                  tracking-wide
                  uppercase
                  ${isActive ? 'text-amber-900' : 'text-amber-800'}
                `}>
                  {button.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Contact Sheet */}
      <ContactSheet 
        isOpen={isContactSheetOpen}
        onClose={() => setIsContactSheetOpen(false)}
      />
    </>
  );
}