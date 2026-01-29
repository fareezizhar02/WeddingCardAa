"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, ArrowUp } from "lucide-react";
import InvitationCard from "./InvitationCard";
import MusicSection from "./MusicSection";
import BottomAppBar from "./BottomAppBar";
import EntranceScreen from "./EntranceScreen";
import FloatingMuteButton from "./FloatingMuteButton";
import ContentCard from "./ContentCard";

type PageType = "cover" | "music";

/**
 * InvitationPage WITHOUT PageTransition
 *
 * Testing if PageTransition is causing the height issue
 */
export default function InvitationPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("cover");
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [showScrollControl, setShowScrollControl] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const isAutoScrollActiveRef = useRef(true);
  const currentPageRef = useRef<PageType>("cover");

  const AUTO_SCROLL_CONFIG = {
    initialDelay: 3000, // Wait 3 seconds before starting
    continuousScrollSpeed: 1.5, // Scroll speed in pixels per frame
  };

  const handleEnter = async () => {
    // CRITICAL: Reset scroll to top on entrance
    window.scrollTo(0, 0);

    setHasEntered(true);
    console.log("🎬 User entered");

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 138;
        await audioRef.current.play();
        setIsPlaying(true);
        console.log("🎵 Audio playing");
      } catch (error) {
        console.error("❌ Audio error:", error);
      }
    }

    setTimeout(() => {
      setShowScrollControl(true);
    }, 1000);

    autoScrollTimeoutRef.current = setTimeout(() => {
      console.log(
        "Document height after delay:",
        document.documentElement.scrollHeight,
      );
      if (isAutoScrollActiveRef.current) {
        startAutoScroll();
      }
    }, AUTO_SCROLL_CONFIG.initialDelay);
  };

  const startAutoScroll = () => {
    console.log("🚀 Starting auto-scroll");
    console.log("Document height:", document.documentElement.scrollHeight);
    console.log("Window height:", window.innerHeight);

    // ✅ prevent double RAF loop
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    let frameCount = 0;

    const scroll = () => {
      // ✅ read from refs (no stale state)
      if (!isAutoScrollActiveRef.current) {
        console.log("⏹️ Auto-scroll stopped (ref)");
        scrollAnimationRef.current = null;
        return;
      }

      // ✅ stop auto-scroll if not on cover page
      if (currentPageRef.current !== "cover") {
        console.log("⏹️ Auto-scroll stopped (page changed)");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
        return;
      }

      const maxScroll =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight,
        ) - window.innerHeight;

      // ✅ guard: no scrollable area
      if (maxScroll <= 0) {
        console.log("⚠️ No scrollable area");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
        return;
      }

      const currentScroll = window.scrollY;
      frameCount++;

      if (frameCount % 60 === 0) {
        console.log(
          `📍 ${currentScroll.toFixed(0)}/${maxScroll.toFixed(0)}px (${(
            (currentScroll / maxScroll) *
            100
          ).toFixed(1)}%)`,
        );
      }

      if (currentScroll < maxScroll - 5) {
        window.scrollBy(0, AUTO_SCROLL_CONFIG.continuousScrollSpeed);
        scrollAnimationRef.current = requestAnimationFrame(scroll);
      } else {
        console.log("🏁 Reached bottom");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false); // ✅ indicator akan hilang + button jadi Play
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(scroll);
  };

  // Remove startSlowScroll - we don't need it anymore!

  const stopAutoScroll = () => {
    console.log("⏸️ Stopped");
    isAutoScrollActiveRef.current = false; // ✅ immediate stop for RAF loop
    setIsAutoScrollActive(false);

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const resumeAutoScroll = () => {
    console.log("▶️ Resumed");
    isAutoScrollActiveRef.current = true; // ✅ immediate
    setIsAutoScrollActive(true);
    startAutoScroll();
  };

  const toggleAutoScroll = () => {
    if (isAutoScrollActive) {
      stopAutoScroll();
    } else {
      resumeAutoScroll();
    }
  };

  const scrollToTop = () => {
    console.log("⬆️ Scrolling to top");
    stopAutoScroll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowScrollToTop(scrollPos > window.innerHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    isAutoScrollActiveRef.current = isAutoScrollActive;
  }, [isAutoScrollActive]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== "cover") {
      stopAutoScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!hasEntered) return;

    const handleUserInteraction = (type: string) => {
      if (isAutoScrollActiveRef.current) {
        console.log(`👤 User ${type}`);
        stopAutoScroll();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        isAutoScrollActiveRef.current = false; // instant kill
        handleUserInteraction("wheel");
      }
    };

    const handleTouch = () => handleUserInteraction("touch");
    const handleKey = (e: KeyboardEvent) => {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(e.key)
      ) {
        handleUserInteraction(`key`);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("keydown", handleKey);
    };
  }, [hasEntered, isAutoScrollActive]);

  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current)
        clearTimeout(autoScrollTimeoutRef.current);
      if (scrollAnimationRef.current)
        cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, []);

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
          console.error("Play failed:", error);
        }
      }
    }
  };

  const goToCoverPage = () => {
    setCurrentPage("cover");
    setTimeout(() => scrollToTop(), 100);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/MusicBackground.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!hasEntered && <EntranceScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cream-100 via-amber-50/50 to-stone-100 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,239,231,0.8),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(251,243,228,0.6),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]"></div>
      </div>

      {/* NO PageTransition wrapper - direct rendering */}
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
              ref={contentCardRef}
              className="min-h-screen flex items-start justify-center px-0 sm:px-6 md:px-8 py-2 bg-gradient-to-br from-cream-50 to-amber-50/20"
            >
              <ContentCard />
            </div>

            {/* Footer / Credit */}
            <div
              className="
                flex
                items-center
                justify-center
                py-0
                sm:py-2
                bg-gradient-to-br
                from-cream-50
                to-amber-50/20
              "
            >
              <p
                className="
                  font-playfair
                  text-[13px]
                  sm:text-[14px]
                  text-stone-600
                  tracking-wide
                "
              >
                Direka Oleh <br />
                <span className="font-semibold text-stone-700">
                  Fareez Izhar
                </span>
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
            <MusicSection
              audioRef={audioRef}
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
            />
            <button
              onClick={goToCoverPage}
              className="fixed top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-800 rounded-full font-medium text-sm shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 z-30"
            >
              ← Kembali
            </button>
          </motion.div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {hasEntered && showScrollToTop && currentPage === "cover" && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed top-6 left-4 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-white to-cream-50 hover:from-amber-50 hover:to-cream-100 shadow-lg flex items-center justify-center border border-amber-200/50"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Auto-Scroll Control */}
      {hasEntered &&
        showScrollControl &&
        currentPage === "cover" &&
        !showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleAutoScroll}
            className="fixed bottom-24 left-4 sm:bottom-28 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-white to-cream-50 hover:from-amber-50 hover:to-cream-100 shadow-lg flex items-center justify-center border border-amber-200/50"
          >
            {isAutoScrollActive ? (
              <Pause
                className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800"
                fill="currentColor"
              />
            ) : (
              <Play
                className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800 ml-0.5"
                fill="currentColor"
              />
            )}
          </motion.button>
        )}

      {/* Auto-scroll indicator */}
      <AnimatePresence>
        {isAutoScrollActive &&
          showScrollControl &&
          currentPage === "cover" &&
          !showScrollToTop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
              <span>Auto-scrolling...</span>
            </motion.div>
          )}
      </AnimatePresence>

      {hasEntered && <FloatingMuteButton audioRef={audioRef} />}
      {hasEntered && (
        <BottomAppBar currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}
