"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Auto-scroll icons (Pause/Play/ArrowUp) not needed while auto-scroll disabled
// import { Pause, Play, ArrowUp } from "lucide-react";

import InvitationCard from "./InvitationCard";
import MusicSection from "./MusicSection";
import BottomAppBar from "./BottomAppBar";
import EntranceScreen from "./EntranceScreen";
import FloatingMuteButton from "./FloatingMuteButton";
import ContentCard from "./ContentCard";
import SparkleLayer from "./SparkleLayer";

type PageType = "cover" | "music";

/**
 * InvitationPage Component
 *
 * ✅ Auto-scroll is temporarily DISABLED (commented out)
 */
export default function InvitationPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // const contentCardRef = useRef<HTMLDivElement>(null); // (optional) keep if you need later

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("cover");

  /**
   * =========================
   * AUTO SCROLL — DISABLED
   * =========================
   *
   * Everything related to auto-scroll is commented out below.
   */

  // const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  // const [showScrollControl, setShowScrollControl] = useState(false);
  // const [showScrollToTop, setShowScrollToTop] = useState(false);

  // const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const scrollAnimationRef = useRef<number | null>(null);

  // const isAutoScrollActiveRef = useRef(true);
  // const currentPageRef = useRef<PageType>("cover");
  // const retryCountRef = useRef(0);

  // const AUTO_SCROLL_CONFIG = useRef({
  //   initialDelay: 3000,
  //   continuousScrollSpeed: 3, // set later based on viewport
  //   maxRetries: 5,
  //   retryDelay: 500,
  //   minScrollableHeight: 100,
  // });

  // useEffect(() => {
  //   const w = window.innerWidth;
  //   AUTO_SCROLL_CONFIG.current.continuousScrollSpeed = w < 768 ? 5 : 2;
  // }, []);

  // useEffect(() => {
  //   isAutoScrollActiveRef.current = isAutoScrollActive;
  // }, [isAutoScrollActive]);

  // useEffect(() => {
  //   currentPageRef.current = currentPage;
  // }, [currentPage]);

  // const stopAutoScroll = useCallback(() => {
  //   isAutoScrollActiveRef.current = false;
  //   setIsAutoScrollActive(false);

  //   if (scrollAnimationRef.current) {
  //     cancelAnimationFrame(scrollAnimationRef.current);
  //     scrollAnimationRef.current = null;
  //   }
  // }, []);

  // const startAutoScroll = useCallback(() => {
  //   if (scrollAnimationRef.current) {
  //     cancelAnimationFrame(scrollAnimationRef.current);
  //     scrollAnimationRef.current = null;
  //   }

  //   const scroll = () => {
  //     if (!isAutoScrollActiveRef.current) {
  //       scrollAnimationRef.current = null;
  //       return;
  //     }

  //     if (currentPageRef.current !== "cover") {
  //       isAutoScrollActiveRef.current = false;
  //       setIsAutoScrollActive(false);
  //       scrollAnimationRef.current = null;
  //       return;
  //     }

  //     const maxScroll =
  //       Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
  //       window.innerHeight;

  //     if (maxScroll <= 0) {
  //       isAutoScrollActiveRef.current = false;
  //       setIsAutoScrollActive(false);
  //       scrollAnimationRef.current = null;
  //       return;
  //     }

  //     const currentScroll =
  //       window.scrollY ||
  //       document.documentElement.scrollTop ||
  //       document.body.scrollTop ||
  //       0;

  //     if (currentScroll < maxScroll - 5) {
  //       const nextScrollPos = Math.min(
  //         currentScroll + AUTO_SCROLL_CONFIG.current.continuousScrollSpeed,
  //         maxScroll
  //       );

  //       document.documentElement.scrollTop = nextScrollPos;
  //       document.body.scrollTop = nextScrollPos;
  //       window.scrollTo(0, nextScrollPos);

  //       scrollAnimationRef.current = requestAnimationFrame(scroll);
  //     } else {
  //       isAutoScrollActiveRef.current = false;
  //       setIsAutoScrollActive(false);
  //       scrollAnimationRef.current = null;
  //     }
  //   };

  //   scrollAnimationRef.current = requestAnimationFrame(scroll);
  // }, []);

  // const checkLayoutAndStartScroll = useCallback(() => {
  //   const el = (document.scrollingElement || document.documentElement) as HTMLElement;
  //   const scrollHeight = el.scrollHeight;
  //   const windowHeight = el.clientHeight || window.innerHeight;

  //   const hasScrollableArea =
  //     scrollHeight > windowHeight + AUTO_SCROLL_CONFIG.current.minScrollableHeight;

  //   if (hasScrollableArea && isAutoScrollActiveRef.current) {
  //     retryCountRef.current = 0;
  //     startAutoScroll();
  //     return;
  //   }

  //   if (!hasScrollableArea && retryCountRef.current < AUTO_SCROLL_CONFIG.current.maxRetries) {
  //     retryCountRef.current += 1;

  //     requestAnimationFrame(() => {
  //       setTimeout(checkLayoutAndStartScroll, AUTO_SCROLL_CONFIG.current.retryDelay);
  //     });
  //     return;
  //   }

  //   retryCountRef.current = 0;
  // }, [startAutoScroll]);

  // const resumeAutoScroll = useCallback(() => {
  //   isAutoScrollActiveRef.current = true;
  //   setIsAutoScrollActive(true);

  //   retryCountRef.current = 0;
  //   checkLayoutAndStartScroll();
  // }, [checkLayoutAndStartScroll]);

  // const toggleAutoScroll = () => {
  //   if (isAutoScrollActive) stopAutoScroll();
  //   else resumeAutoScroll();
  // };

  // const scrollToTop = () => {
  //   stopAutoScroll();
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
  //     setShowScrollToTop(scrollPos > window.innerHeight * 0.3);
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   if (currentPage !== "cover") stopAutoScroll();
  // }, [currentPage, stopAutoScroll]);

  // useEffect(() => {
  //   if (!hasEntered) return;

  //   const handleUserInteraction = () => {
  //     if (isAutoScrollActiveRef.current) stopAutoScroll();
  //   };

  //   const handleWheel = (e: WheelEvent) => {
  //     if (Math.abs(e.deltaY) > 10) handleUserInteraction();
  //   };

  //   let touchStartY = 0;

  //   const handleTouchStart = (e: TouchEvent) => {
  //     touchStartY = e.touches[0]?.clientY ?? 0;
  //   };

  //   const handleTouchMove = (e: TouchEvent) => {
  //     const y = e.touches[0]?.clientY ?? 0;
  //     const deltaY = Math.abs(y - touchStartY);
  //     if (deltaY > 30) handleUserInteraction();
  //   };

  //   const handleKey = (e: KeyboardEvent) => {
  //     if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)) {
  //       handleUserInteraction();
  //     }
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: true });
  //   window.addEventListener("keydown", handleKey);
  //   window.addEventListener("touchstart", handleTouchStart, { passive: true });
  //   window.addEventListener("touchmove", handleTouchMove, { passive: true });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //     window.removeEventListener("keydown", handleKey);
  //     window.removeEventListener("touchstart", handleTouchStart);
  //     window.removeEventListener("touchmove", handleTouchMove);
  //   };
  // }, [hasEntered, stopAutoScroll]);

  // useEffect(() => {
  //   return () => {
  //     if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
  //     if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
  //   };
  // }, []);

  /**
   * =========================
   * END AUTO SCROLL — DISABLED
   * =========================
   */

  const handleEnter = async () => {
    // keep scroll top behavior (not auto-scroll)
    window.scrollTo(0, 0);

    setHasEntered(true);

    // Ensure scrolling is enabled
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.height = "auto";

    // Start audio (may be blocked by browser until user gesture; EntranceScreen click counts)
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 138;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play blocked:", error);
      }
    }

    // Auto-scroll UI is disabled, so we don't show scroll controls
    // setTimeout(() => setShowScrollControl(true), 1000);
    // if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    // autoScrollTimeoutRef.current = setTimeout(() => {
    //   if (!isAutoScrollActiveRef.current) return;
    //   checkLayoutAndStartScroll();
    // }, AUTO_SCROLL_CONFIG.current.initialDelay);
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Play failed:", error);
    }
  };

  const goToCoverPage = () => {
    setCurrentPage("cover");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/MusicBackground.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>{!hasEntered && <EntranceScreen onEnter={handleEnter} />}</AnimatePresence>

      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-cream-100 via-amber-50/50 to-stone-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,239,231,0.8),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(251,243,228,0.6),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]" />
      </div>

      {/* Page Content */}
      <div className="relative">
        {currentPage === "cover" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* InvitationCard Section */}
            <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-6 md:px-8 bg-gradient-to-br from-cream-100 via-amber-50/50 to-stone-100">
              <InvitationCard />
            </div>

            {/* ContentCard Section */}
            <div
              // ref={contentCardRef}
              className="min-h-screen flex items-start justify-center px-0 sm:px-6 md:px-8 py-2 bg-gradient-to-br from-cream-50 to-amber-50/20"
            >
              <ContentCard />
            </div>

            {/* Footer / Credit */}
            <div className="flex items-center justify-center py-0 sm:py-2 bg-gradient-to-br from-cream-50 to-amber-50/20">
              <p className="font-playfair text-[13px] sm:text-[14px] text-stone-600 tracking-wide">
                Direka Oleh <br />
                <span className="font-semibold text-stone-700">Fareez Izhar</span>
              </p>
            </div>

            {/* Bottom padding for nav bar */}
            <div className="h-20 sm:h-24 bg-gradient-to-br from-cream-50 to-amber-50/20" />
          </motion.div>
        )}

        {currentPage === "music" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 py-8 pb-28 sm:px-6 sm:py-12 sm:pb-32 md:px-8 md:py-16 flex items-center justify-center"
          >
            <MusicSection audioRef={audioRef} isPlaying={isPlaying} onPlayPause={togglePlayPause} />
            <button
              onClick={goToCoverPage}
              className="fixed top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-800 rounded-full font-medium text-sm shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 z-30"
            >
              ← Kembali
            </button>
          </motion.div>
        )}
      </div>

      /**
       * Auto-scroll UI (Scroll-to-top, Pause/Play, Indicator) — DISABLED
       *
       * When you want to re-enable later, uncomment:
       * - icons import
       * - states: isAutoScrollActive/showScrollControl/showScrollToTop
       * - handlers + effects
       * - UI blocks
       */

      {hasEntered && <FloatingMuteButton audioRef={audioRef} />}
      {hasEntered && <BottomAppBar currentPage={currentPage} onNavigate={setCurrentPage} />}

      {/* ✨ Sparkle Layer */}
      <SparkleLayer />
    </div>
  );
}
