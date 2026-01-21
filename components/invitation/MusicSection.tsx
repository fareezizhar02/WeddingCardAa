'use client';

import MusicPlayer from './MusicPlayer';

interface MusicSectionProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
}

/**
 * MusicSection Component
 * 
 * Music player section - always rendered behind cover page.
 */
export default function MusicSection({ audioRef, isPlaying, onPlayPause }: MusicSectionProps) {
  return (
    <div className="
      w-full
      max-w-2xl
      mx-auto
      bg-gradient-to-br from-cream-50 to-amber-50/30
      rounded-2xl
      shadow-[0_8px_30px_rgb(139,92,46,0.12)]
      border border-amber-100/50
      overflow-hidden
      p-8 sm:p-12 md:p-16
      relative
    ">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')] opacity-40 pointer-events-none"></div>

      <div className="relative space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900">
            Our Song
          </h2>
          <p className="text-sm text-amber-700/70">
            A melody close to our hearts
          </p>
        </div>

        {/* Music Player */}
        <MusicPlayer 
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
        />
      </div>
    </div>
  );
}