'use client';

import { motion } from 'framer-motion';
import { Playfair_Display, Great_Vibes, Montserrat } from 'next/font/google';
import Image from 'next/image';

const playfair = Playfair_Display({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

/**
 * InvitationContent Component
 * 
 * Full-screen wedding cover page with background image,
 * handwriting-style name animations, and elegant typography.
 */
export default function InvitationContent() {
  // SVG path for "Fareez" handwriting animation
  const fareezPath = "M10,40 Q20,20 40,30 T80,40 Q100,35 120,40";
  
  // SVG path for "Zanis" handwriting animation
  const zanisPath = "M10,40 Q30,25 50,35 T90,40 Q110,38 120,42";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/BgCP2.png"
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex items-start justify-center px-6 pt-36 min-[375px]:pt-36 min-[390px]:pt-60 sm:pt-48">
        <div className="w-full max-w-[420px] sm:max-w-[520px] flex flex-col items-center">
          
          {/* Top Title: WALIMATULURUS */}
          {/* <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${playfair.className} text-[18px] sm:text-[20px] uppercase tracking-[0.3em] text-stone-700 font-semibold mb-8`}
          >
            Walimatulurus
          </motion.h2> */}

          {/* Names Block */}
          <div className="mb-10 flex flex-col items-center">
            {/* Fareez - Handwriting Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="relative"
            >
              <motion.h1
                className={`${greatVibes.className} text-[64px] sm:text-[76px] leading-[0.9] text-stone-700`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.8,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  Fareez
                </motion.span>
              </motion.h1>
              
              {/* SVG underline animation for handwriting effect */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 pointer-events-none"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d={fareezPath}
                  stroke="rgb(87, 83, 78)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    delay: 0.8,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </motion.div>

            {/* & Symbol */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${montserrat.className} text-[24px] sm:text-[28px] font-medium tracking-widest text-stone-700 my-2`}
            >
              &
            </motion.p>

            {/* Zanis - Handwriting Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.3 }}
              className="relative"
            >
              <motion.h1
                className={`${greatVibes.className} text-[64px] sm:text-[76px] leading-[0.9] text-stone-700`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 3.2,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  Zanis
                </motion.span>
              </motion.h1>
              
              {/* SVG underline animation for handwriting effect */}
              {/* <svg
                className="absolute -bottom-2 left-0 w-full h-2 pointer-events-none"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              > */}
                {/* <motion.path
                  d={zanisPath}
                  stroke="rgb(87, 83, 78)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    delay: 3.2,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </svg> */}
            </motion.div>
          </div>

          {/* Date/Time Block - 3 Column Layout */}
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 5.0,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${montserrat.className} flex items-center gap-8 mb-8`}
          > */}
            {/* Left Column: SABTU */}
            {/* <div className="flex flex-col items-center">
              <span className="text-[13px] tracking-[0.25em] uppercase text-stone-600">
                Sabtu
              </span>
            </div> */}

            {/* Divider */}
            {/* <div className="w-px h-14 bg-stone-400/60" /> */}

            {/* Center Column: MAC 28 2026 */}
            {/* <div className="flex flex-col items-center gap-1">
              <span className="text-[13px] tracking-[0.25em] uppercase text-stone-600">
                Mac
              </span>
              <span className="text-[28px] font-semibold tracking-[0.08em] text-stone-800">
                28
              </span>
              <span className="text-[13px] tracking-[0.25em] uppercase text-stone-600">
                2026
              </span>
            </div> */}

            {/* Divider */}
            {/* <div className="w-px h-14 bg-stone-400/60" /> */}

            {/* Right Column: TIME */}
            {/* <div className="flex flex-col items-center">
              <span className="text-[13px] tracking-[0.25em] uppercase text-stone-600">
                12.00 P.M.
              </span>
            </div>
          </motion.div> */}

          {/* Hashtag */}
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 5.3,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${greatVibes.className} text-[18px] sm:text-[20px] text-stone-600 mt-8`}
          >
            #SatuSyafDibelakangFareez
          </motion.p> */}
        </div>
      </div>
    </div>
  );
}