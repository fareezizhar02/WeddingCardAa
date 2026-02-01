'use client';

import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  visible: boolean;
  onResume: () => void;
};

export default function AutoScrollResumeChip({ visible, onResume }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={onResume}
          className="
            fixed
            inset-x-0
            mx-auto
            w-fit
            z-[80]
            px-4
            py-2
            rounded-full
            bg-white/70
            backdrop-blur-md
            border border-white/40
            shadow-[0_10px_25px_rgba(0,0,0,0.12)]
            text-stone-700
            text-[12px]
            tracking-[0.22em]
            uppercase
            pointer-events-auto
            select-none
          "
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 96px)', // adjust ikut appbar
          }}
        >
          Sambung
        </motion.button>
      )}
    </AnimatePresence>
  );
}
