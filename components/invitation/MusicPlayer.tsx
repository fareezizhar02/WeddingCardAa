'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
}

/**
 * MusicPlayer Component
 * 
 * Displays a vintage vinyl record player with album cover.
 * Instagram-style circular design with rotating animation.
 */
export default function MusicPlayer({ audioRef, isPlaying, onPlayPause }: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, [audioRef]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Vinyl Record Player */}
      <div className="relative">
        {/* Turntable base */}
        <div className="
          w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96
          rounded-full
          bg-gradient-to-br from-stone-800 via-stone-900 to-black
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          flex items-center justify-center
          relative
        ">
          {/* Vinyl grooves effect */}
          <div className="absolute inset-0 rounded-full opacity-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-white/10"
                style={{
                  margin: `${i * 8}px`,
                }}
              />
            ))}
          </div>

          {/* Rotating vinyl record */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear"
            }}
            className="
              w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72
              rounded-full
              bg-black
              shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]
              flex items-center justify-center
              relative
            "
          >
            {/* Inner label with album cover */}
            <div className="
              w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60
              rounded-full
              bg-gradient-to-br from-amber-50 to-cream-100
              shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)]
              flex items-center justify-center
              overflow-hidden
              border-4 border-amber-900/20
              relative
            ">
              {/* Album cover image */}
              <div className="w-full h-full relative">
                <Image
                  src="/images/album-cover.jpg"
                  alt="Album Cover"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Optional overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* Center hole */}
            <div className="
              absolute
              w-8 h-8
              rounded-full
              bg-stone-900
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
            " />
          </motion.div>

          {/* Tonearm (stylus) */}
          <motion.div
            animate={{
              rotate: isPlaying ? -25 : -5,
            }}
            transition={{ duration: 0.5 }}
            className="
              absolute
              top-8 right-8
              w-2 h-32
              bg-gradient-to-b from-stone-400 to-stone-600
              rounded-full
              origin-top
              shadow-lg
            "
            style={{
              transformOrigin: 'top center',
            }}
          >
            {/* Needle */}
            <div className="
              absolute
              -bottom-1
              left-1/2
              -translate-x-1/2
              w-3 h-3
              bg-amber-600
              rounded-full
              shadow-md
            " />
          </motion.div>
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif text-amber-900">
          Malam Bulan Dipagar Bintang
        </h3>
        <p className="text-sm text-amber-700/70">
          Tan Sri P. Ramlee
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-2">
        <div className="w-full h-1 bg-amber-200/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-700 to-amber-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-amber-700/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause Control */}
      <div className="flex items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onPlayPause}
          className="
            w-16 h-16
            rounded-full
            bg-gradient-to-br from-amber-700 to-amber-900
            shadow-lg
            hover:shadow-xl
            flex items-center justify-center
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-amber-300/50
            focus:ring-offset-2
          "
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          )}
        </motion.button>
      </div>

      {/* Decorative text */}
      <p className="text-xs text-amber-700/50 italic text-center max-w-xs">
        Our special song for this beautiful day
      </p>
    </div>
  );
}