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
import SparkleLayer from "./SparkleLayer";

type PageType = "cover" | "music";

/**
 * InvitationPage Component
 * 
 * Main page with auto-scroll functionality optimized for mobile devices.
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
  const retryCountRef = useRef(0);

  const AUTO_SCROLL_CONFIG = {
    initialDelay: 3000, // Wait 3 seconds before starting
    continuousScrollSpeed: window.innerWidth < 768 ? 5 : 2, // Scroll speed in pixels per frame
    maxRetries: 5, // Maximum retries for layout detection
    retryDelay: 500, // Delay between retries
    minScrollableHeight: 100, // Minimum scrollable height required
  };

  const handleEnter = async () => {
    // CRITICAL: Reset scroll to top on entrance
    window.scrollTo(0, 0);

    setHasEntered(true);
    console.log("🎬 User entered");
    
    // Ensure scrolling is enabled
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.height = "auto";

    // Start audio
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

    // Show scroll control after 1 second
    setTimeout(() => {
      setShowScrollControl(true);
    }, 1000);

    // Start auto-scroll with improved layout detection
    autoScrollTimeoutRef.current = setTimeout(() => {
      checkLayoutAndStartScroll();
    }, AUTO_SCROLL_CONFIG.initialDelay);
  };

  /**
   * Check if layout is settled and start auto-scroll
   * Retries if scrollable area is not detected (mobile fix)
   */
  const checkLayoutAndStartScroll = () => {
    const el = (document.scrollingElement || document.documentElement) as HTMLElement;
const scrollHeight = el.scrollHeight;
const windowHeight = el.clientHeight || window.innerHeight;
const hasScrollableArea =
  scrollHeight > windowHeight + AUTO_SCROLL_CONFIG.minScrollableHeight;
    
    console.log('📏 Layout check:', {
      bodyScrollHeight: document.body.scrollHeight, // ok
htmlScrollHeight: document.documentElement.scrollHeight, // ok
elScrollHeight: el.scrollHeight, // tambah
elClientHeight: el.clientHeight, // tambah
    });
    
    if (hasScrollableArea && isAutoScrollActiveRef.current) {
      console.log('✅ Layout settled, starting auto-scroll');
      retryCountRef.current = 0; // Reset retry count
      startAutoScroll();
    } else if (!hasScrollableArea && retryCountRef.current < AUTO_SCROLL_CONFIG.maxRetries) {
      retryCountRef.current++;
      console.warn(`⚠️ No scrollable area detected, retrying (${retryCountRef.current}/${AUTO_SCROLL_CONFIG.maxRetries})...`);
      
      // Wait for next animation frame and retry
      requestAnimationFrame(() => {
        setTimeout(checkLayoutAndStartScroll, AUTO_SCROLL_CONFIG.retryDelay);
      });
    } else if (retryCountRef.current >= AUTO_SCROLL_CONFIG.maxRetries) {
      console.error('❌ Failed to detect scrollable area after max retries');
      retryCountRef.current = 0;
    }
  };

  const startAutoScroll = () => {
    console.log("🚀 Starting auto-scroll");

    // Get scroll container (try multiple options for mobile compatibility)
    const scrollingElement = document.scrollingElement as HTMLElement | null;
    const fallbackElement = document.documentElement;
    const scrollContainer = scrollingElement || fallbackElement;

    // Log comprehensive debugging info
    console.log({
      scrollingElement: scrollContainer.tagName,
      scrollHeight: scrollContainer.scrollHeight,
      clientHeight: scrollContainer.clientHeight,
      innerHeight: window.innerHeight,
      maxScroll: scrollContainer.scrollHeight - window.innerHeight,
      bodyOverflow: getComputedStyle(document.body).overflow,
      htmlOverflow: getComputedStyle(document.documentElement).overflow,
      bodyHeight: document.body.scrollHeight,
      htmlHeight: document.documentElement.scrollHeight,
      visualViewport: window.visualViewport?.height,
    });

    // ✅ Prevent double RAF loop
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    let frameCount = 0;

    const scroll = () => {
      // ✅ Read from refs (no stale state)
      if (!isAutoScrollActiveRef.current) {
        console.log("⏹️ Auto-scroll stopped (ref)");
        scrollAnimationRef.current = null;
        return;
      }

      // ✅ Stop auto-scroll if not on cover page
      if (currentPageRef.current !== "cover") {
        console.log("⏹️ Auto-scroll stopped (page changed)");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
        return;
      }

      // Get current scroll container (re-check each frame for mobile)
      const el = (document.scrollingElement || document.documentElement) as HTMLElement;

      if (!el) {
        console.log("⚠️ No scrollingElement");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
        return;
      }

      const maxScroll =
  Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
  window.innerHeight;


      // ✅ Guard: no scrollable area
      if (maxScroll <= 0) {
        console.log("⚠️ No scrollable area (maxScroll:", maxScroll, ")");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
        return;
      }

      const currentScroll =
  window.scrollY ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;
      frameCount++;

      // Log progress every 60 frames (~1 second at 60fps)
      if (frameCount % 60 === 0) {
  console.log("tops:", {
    html: document.documentElement.scrollTop,
    body: document.body.scrollTop,
    win: window.scrollY,
  });
}

      // Continue scrolling if not at bottom
      if (currentScroll < maxScroll - 5) {
        const nextScrollPos = Math.min(
          currentScroll + AUTO_SCROLL_CONFIG.continuousScrollSpeed,
          maxScroll
        );
        
        // ✅ Use scrollTo for better mobile compatibility
        // ✅ force scroll on all possible containers (mobile safe)
document.documentElement.scrollTop = nextScrollPos;
document.body.scrollTop = nextScrollPos; // iOS fallback
window.scrollTo(0, nextScrollPos);
        
        scrollAnimationRef.current = requestAnimationFrame(scroll);
      } else {
        console.log("🏁 Reached bottom");
        isAutoScrollActiveRef.current = false;
        setIsAutoScrollActive(false);
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    console.log("⏸️ Auto-scroll stopped");
    isAutoScrollActiveRef.current = false; // ✅ Immediate stop for RAF loop
    setIsAutoScrollActive(false);

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const resumeAutoScroll = () => {
    console.log("▶️ Auto-scroll resumed");
    isAutoScrollActiveRef.current = true; // ✅ Immediate
    setIsAutoScrollActive(true);
    
    // Re-check layout before resuming (in case page height changed)
    retryCountRef.current = 0;
    checkLayoutAndStartScroll();
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

  // Monitor scroll position for showing "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowScrollToTop(scrollPos > window.innerHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync refs with state
  useEffect(() => {
    isAutoScrollActiveRef.current = isAutoScrollActive;
  }, [isAutoScrollActive]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // Stop auto-scroll when leaving cover page
  useEffect(() => {
    if (currentPage !== "cover") {
      stopAutoScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Handle user interaction to stop auto-scroll
  useEffect(() => {
    if (!hasEntered) return;

    const handleUserInteraction = (type: string) => {
      if (isAutoScrollActiveRef.current) {
        console.log(`👤 User interaction: ${type}`);
        stopAutoScroll();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Only stop if user makes a deliberate scroll (not accidental micro-movements)
      if (Math.abs(e.deltaY) > 10) {
        isAutoScrollActiveRef.current = false; // Instant kill
        handleUserInteraction("wheel");
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      const deltaY = Math.abs(y - touchStartY);

      // ✅ Only stop on deliberate swipe (increased threshold for mobile)
      if (deltaY > 30) { // Increased from 12 to 30
        console.log('👆 User swiped:', deltaY, 'px');
        handleUserInteraction("touch");
      }
    };

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
        handleUserInteraction(`keyboard: ${e.key}`);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKey);
    };
  }, [hasEntered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
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
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Auto-Scroll Control Button */}
      <AnimatePresence>
        {hasEntered &&
          showScrollControl &&
          currentPage === "cover" &&
          !showScrollToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={toggleAutoScroll}
              className="fixed bottom-24 left-4 sm:bottom-28 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-white to-cream-50 hover:from-amber-50 hover:to-cream-100 shadow-lg flex items-center justify-center border border-amber-200/50 transition-all"
              aria-label={
                isAutoScrollActive ? "Pause auto-scroll" : "Resume auto-scroll"
              }
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
      </AnimatePresence>

      {/* Auto-scroll Indicator */}
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

      {/* ✨ Sparkle Layer (di atas background, bawah content) */}
      <SparkleLayer />
    </div>
  );
}