'use client';

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import InvitationCard from './InvitationCard';
import MusicSection from './MusicSection';
import BottomAppBar from './BottomAppBar';
import EntranceScreen from './EntranceScreen';
import FloatingMuteButton from './FloatingMuteButton';
import PageTransition from './PageTransition';
import ContentCard from './ContentCard';

type PageType = 'cover' | 'music';

/**
 * InvitationPage Component
 * 
 * Main page container with cinematic page transitions.
 * Includes entrance screen and audio autoplay functionality.
 */
export default function InvitationPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('cover');

  const handleEnter = async () => {
    setHasEntered(true);
    
    // Play audio when user enters
    if (audioRef.current) {
      try {
        // Set starting position to 72/113/138/144 seconds for a better intro
        audioRef.current.currentTime = 138;
        
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Play failed:', error);
      }
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Play failed:', error);
        }
      }
    }
  };

  const goToMusicPage = () => {
    setCurrentPage('music');
  };

  const goToCoverPage = () => {
    setCurrentPage('cover');
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/MusicBackground.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Entrance Screen */}
      <AnimatePresence>
        {!hasEntered && (
          <EntranceScreen onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Fixed Background - Always visible */}
      <div className="
        fixed
        inset-0
        bg-gradient-to-br
        from-cream-100
        via-amber-50/50
        to-stone-100
        -z-10
      ">
        {/* Subtle radial gradient overlay for depth */}
        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(245,239,231,0.8),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(251,243,228,0.6),transparent_50%)]
        "></div>
        
        {/* Very subtle grain texture */}
        <div className="
          absolute
          inset-0
          opacity-[0.015]
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]
        "></div>
      </div>

      {/* Page Container with Transitions */}
      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'cover' && (
            <PageTransition key="cover" type="cover">
              {/* Cover Page Content */}
              <main className="
              pb-28 sm:pb-32
              relative
              overflow-hidden"
              >
                {/* InvitationCard - The curtain (slides up to reveal) */}
                <div className="
                  min-h-screen
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-0 sm:px-6 md:px-8
                  sticky
                  top-0
                  z-10
                  bg-cream-100  
                  from-cream-100
                  via-amber-50/50
                  to-stone-100
                ">
                  <InvitationCard />
                </div>
                {/* ContentCard - The stage (always behind) */}
                <div className="
                  min-h-screen
                  flex
                  top-alignment
                  justify-center
                  px-0 sm:px-6 md:px-8
                  relative 
                  top-0
                  left-0
                  right-0 
                  z-0
                  -mt-screen
                ">
                  <ContentCard />
                </div>
                </main>
            </PageTransition>
          )}

          {currentPage === 'music' && (
            <PageTransition key="music" type="music">
              {/* Music Page Content */}
              <main className="
                min-h-screen
                px-4
                py-8
                pb-28
                sm:px-6
                sm:py-12
                sm:pb-32
                md:px-8
                md:py-16
                flex
                items-center
                justify-center
              ">
                <MusicSection 
                  audioRef={audioRef}
                  isPlaying={isPlaying}
                  onPlayPause={togglePlayPause}
                />

                {/* Back to Cover Button */}
                <button
                  onClick={goToCoverPage}
                  className="
                    fixed
                    top-6
                    left-6
                    px-4
                    py-2
                    bg-white/80
                    backdrop-blur-sm
                    text-amber-800
                    rounded-full
                    font-medium
                    text-sm
                    shadow-md
                    hover:bg-white
                    hover:shadow-lg
                    transition-all
                    duration-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-300/50
                    z-30
                  "
                >
                  ← Kembali
                </button>
              </main>
            </PageTransition>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Mute Button - Fixed position */}
      {hasEntered && <FloatingMuteButton audioRef={audioRef} />}

      {/* Bottom Navigation Bar - Fixed */}
      {hasEntered && <BottomAppBar currentPage={currentPage} onNavigate={setCurrentPage} />}
    </div>
  );
}