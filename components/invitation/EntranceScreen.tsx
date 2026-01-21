'use client';

import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

interface EntranceScreenProps {
  onEnter: () => void;
}

export default function EntranceScreen({ onEnter }: EntranceScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        bg-gradient-to-br
        from-cream-100
        via-amber-50/50
        to-stone-100
        z-50
        flex
        items-center
        justify-center
        px-4
      "
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center space-y-8"
      >
        {/* Decorative element */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          💍
        </motion.div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900">
            Fareez & Zanis
          </h1>
          <p className="text-sm text-amber-700/70">
            You're invited to our wedding
          </p>
        </div>

        {/* Enter button */}
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            group
            relative
            px-8
            py-4
            bg-gradient-to-br
            from-amber-700
            to-amber-900
            text-white
            rounded-full
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            font-serif
            text-lg
            flex
            items-center
            gap-3
            mx-auto
          "
        >
          <Music className="w-5 h-5" />
          <span>Open Invitation</span>
          
          {/* Animated ring effect */}
          <motion.span
            className="
              absolute
              inset-0
              rounded-full
              border-2
              border-amber-400
              opacity-0
              group-hover:opacity-100
            "
            animate={{
              scale: [1, 1.1, 1.2],
              opacity: [0.5, 0.3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>

        {/* Hint text */}
        <p className="text-xs text-amber-700/50 italic">
          Click to enter and play our special song
        </p>
      </motion.div>
    </motion.div>
  );
}