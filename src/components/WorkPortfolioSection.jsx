import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { portfolioProjects } from '../data/websiteContent';

const Portfolio3DCard = React.memo(function Portfolio3DCard({
  item,
  offset,
  isActive,
  onClick,
  prefersReducedMotion,
  isMobile,
}) {
  const [loaded, setLoaded] = useState(false);

  // Compute 3D transform values for each relative offset with 120Hz precision
  const getTransforms = () => {
    if (prefersReducedMotion) {
      if (offset === 0) {
        return {
          x: 0,
          z: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          zIndex: 30,
        };
      }
      return {
        x: offset > 0 ? (isMobile ? 220 : 360) : isMobile ? -220 : -360,
        z: 0,
        rotateY: 0,
        scale: 0.85,
        opacity: Math.abs(offset) === 1 ? 0.6 : 0,
        zIndex: 20 - Math.abs(offset),
      };
    }

    // Mobile Transforms (< 768px)
    if (isMobile) {
      if (offset === 0) {
        return {
          x: 0,
          z: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          zIndex: 30,
        };
      }
      if (offset === -1) {
        return {
          x: -180,
          z: -110,
          rotateY: 24,
          scale: 0.82,
          opacity: 0.65,
          zIndex: 20,
        };
      }
      if (offset === 1) {
        return {
          x: 180,
          z: -110,
          rotateY: -24,
          scale: 0.82,
          opacity: 0.65,
          zIndex: 20,
        };
      }
      // Beyond ±1 on mobile
      return {
        x: offset > 0 ? 320 : -320,
        z: -220,
        rotateY: offset > 0 ? -32 : 32,
        scale: 0.7,
        opacity: 0,
        zIndex: 10,
      };
    }

    // Desktop / Tablet Transforms — Ultra-Smooth 120Hz ProMotion Geometry
    if (offset === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
      };
    }
    if (offset === -1) {
      return {
        x: -330,
        z: -160,
        rotateY: 32,
        scale: 0.84,
        opacity: 0.8,
        zIndex: 20,
      };
    }
    if (offset === 1) {
      return {
        x: 330,
        z: -160,
        rotateY: -32,
        scale: 0.84,
        opacity: 0.8,
        zIndex: 20,
      };
    }
    if (offset === -2) {
      return {
        x: -560,
        z: -270,
        rotateY: 40,
        scale: 0.72,
        opacity: 0.38,
        zIndex: 10,
      };
    }
    if (offset === 2) {
      return {
        x: 560,
        z: -270,
        rotateY: -40,
        scale: 0.72,
        opacity: 0.38,
        zIndex: 10,
      };
    }
    return {
      x: offset > 0 ? 760 : -760,
      z: -380,
      rotateY: offset > 0 ? -45 : 45,
      scale: 0.6,
      opacity: 0,
      zIndex: 5,
    };
  };

  const t = getTransforms();
  const cardWidth = isMobile ? 290 : 450;
  const cardHeight = isMobile ? 440 : 500;

  return (
    <motion.div
      initial={false}
      animate={{
        x: t.x,
        z: t.z,
        rotateY: t.rotateY,
        scale: t.scale,
        opacity: t.opacity,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0.1 }
          : {
            type: 'spring',
            stiffness: 320,
            damping: 28,
            mass: 0.75,
            restDelta: 0.001,
          }
      }
      style={{
        position: 'absolute',
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        left: `-${cardWidth / 2}px`,
        top: `-${cardHeight / 2}px`,
        zIndex: t.zIndex,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        pointerEvents: t.opacity > 0 ? 'auto' : 'none',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      className="select-none"
    >
      <div
        onClick={onClick}
        className={`group relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden border transition-all duration-300 bg-[#0A071E]/95 backdrop-blur-md flex flex-col justify-between ${isActive
            ? 'cursor-pointer shadow-2xl'
            : 'cursor-pointer shadow-lg hover:border-white/40 hover:brightness-105'
          }`}
        style={{
          borderColor: isActive ? `${item.accentColor}85` : `${item.accentColor}35`,
          boxShadow: isActive
            ? `0 24px 60px -10px ${item.accentColor}45, 0 0 35px -5px ${item.accentColor}25`
            : `0 10px 30px -8px ${item.accentColor}20`,
        }}
        role="button"
        tabIndex={isActive ? 0 : -1}
        aria-label={isActive ? `View ${item.title} details` : `Click to view ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Specular Top Border Sheen */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" />

        {/* Active Card Inner Glow Rim */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[22px] sm:rounded-[26px] z-10 transition-opacity duration-300"
            style={{ boxShadow: `inset 0 0 28px ${item.accentColor}35` }}
          />
        )}

        {/* Side Card Dimming Overlay (Maintains Center Focus) */}
        {!isActive && (
          <div className="absolute inset-0 bg-[#070514]/40 backdrop-blur-[0.5px] transition-opacity duration-200 pointer-events-none rounded-[22px] sm:rounded-[26px] z-25 group-hover:bg-[#070514]/15" />
        )}

        {/* Media Thumbnail Container with Fast Loading & Skeleton */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070514] shrink-0">
          {!loaded && (
            <div className="absolute inset-0 bg-white/[0.04] animate-pulse" />
          )}
          <img
            src={item.image}
            alt={item.title}
            decoding="async"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'group-hover:scale-[1.04]' : ''
              } ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Soft bottom vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A071E] via-[#0A071E]/20 to-transparent pointer-events-none" />

          {/* Client Tag Pill with subtle accent border */}
          <div className="absolute top-3 sm:top-3.5 left-3 sm:left-3.5 z-10">
            <span
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10.5px] sm:text-[11px] font-mono font-semibold bg-black/75 text-slate-200 backdrop-blur-md border shadow-sm"
              style={{ borderColor: `${item.accentColor}40` }}
            >
              {item.client}
            </span>
          </div>

          {/* Active Card Badge */}
          {isActive && (
            <div className="absolute top-3 sm:top-3.5 right-3 sm:right-3.5 z-10">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/75 text-white backdrop-blur-md border shadow-sm flex items-center gap-1.5"
                style={{ borderColor: `${item.accentColor}60` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: item.accentColor }}
                />
                ACTIVE
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1 justify-between relative z-10">
          <div>
            {/* Category with glowing accent dot */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: item.accentColor,
                  boxShadow: `0 0 8px ${item.accentColor}`,
                }}
              />
              <span
                className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] font-mono font-semibold"
                style={{ color: item.accentColor }}
              >
                {item.category}
              </span>
            </div>

            <h3 className="text-base sm:text-lg lg:text-[20px] font-bold text-white tracking-tight font-sans leading-snug group-hover:text-white transition-colors mb-1.5 sm:mb-2 line-clamp-1">
              {item.title}
            </h3>

            <p className="text-slate-300/85 text-[11px] sm:text-xs lg:text-[13px] leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Tags & Action Button Row */}
          <div
            className="pt-3.5 sm:pt-4 mt-3 sm:mt-4 border-t flex items-center justify-between"
            style={{ borderColor: `${item.accentColor}25` }}
          >
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {item.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[9.5px] sm:text-[10.5px] font-mono border px-2 sm:px-2.5 py-0.5 rounded-full text-slate-200"
                  style={{
                    borderColor: `${item.accentColor}35`,
                    backgroundColor: `${item.accentColor}12`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              {isActive && (
                <span className="text-[11px] font-mono font-semibold text-slate-300 group-hover:text-white hidden sm:inline">
                  View Scope
                </span>
              )}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 transition-all shadow-md border ${isActive
                    ? 'group-hover:text-white group-hover:scale-110'
                    : 'opacity-70 group-hover:opacity-100'
                  }`}
                style={{ borderColor: `${item.accentColor}50` }}
              >
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function WorkPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  // Velocity-based Hover Scrubber references
  // zone values: 0 = Center (stop), -1 = Second card Left (steady), -2 = Third card Left (fast),
  //              1 = Second card Right (steady), 2 = Third card Right (fast)
  const hoverZoneRef = useRef(0);
  const scrubIntervalRef = useRef(null);

  const categories = [
    'All',
    'Retail & Brand Collateral',
    'E-Commerce & Performance',
    'Web Design & Development',
  ];

  const filteredProjects = useMemo(() => {
    return activeCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const total = filteredProjects.length;

  // Stop Hover Scrubbing
  const stopScrubbing = useCallback(() => {
    hoverZoneRef.current = 0;
    if (scrubIntervalRef.current) {
      clearInterval(scrubIntervalRef.current);
      scrubIntervalRef.current = null;
    }
  }, []);

  // Update Scrubbing according to cursor zone
  // Zone ±1: Second card (steady change ~720ms)
  // Zone ±2: Third card (faster change ~340ms)
  const updateScrubbing = useCallback(
    (zone) => {
      if (scrubIntervalRef.current) {
        clearInterval(scrubIntervalRef.current);
        scrubIntervalRef.current = null;
      }

      if (zone === 0 || total <= 1) return;

      // Immediate 1-step advance upon entering zone
      if (zone > 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }

      // Interval speed: Zone 1 (second card) = 720ms; Zone 2 (third card) = 340ms
      const intervalTime = Math.abs(zone) === 2 ? 340 : 720;

      scrubIntervalRef.current = setInterval(() => {
        if (hoverZoneRef.current === 0) {
          stopScrubbing();
          return;
        }
        if (hoverZoneRef.current > 0) {
          setActiveIndex((prev) => (prev + 1) % total);
        } else if (hoverZoneRef.current < 0) {
          setActiveIndex((prev) => (prev - 1 + total) % total);
        }
      }, intervalTime);
    },
    [total, stopScrubbing]
  );

  // Mouse Move over carousel container to detect zones
  const handleContainerMouseMove = (e) => {
    if (isMobile || isDraggingRef.current || total <= 1) {
      if (hoverZoneRef.current !== 0) stopScrubbing();
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const relX = e.clientX - centerX;

    let newZone = 0;
    if (relX < -420) {
      newZone = -2; // Third Card Left (Fast)
    } else if (relX < -180) {
      newZone = -1; // Second Card Left (Steady)
    } else if (relX > 420) {
      newZone = 2;  // Third Card Right (Fast)
    } else if (relX > 180) {
      newZone = 1;  // Second Card Right (Steady)
    } else {
      newZone = 0;  // Center Card (Stationary)
    }

    if (newZone !== hoverZoneRef.current) {
      hoverZoneRef.current = newZone;
      updateScrubbing(newZone);
    }
  };

  const handleContainerMouseLeave = () => {
    stopScrubbing();
  };

  // Safe Category Filter Switcher (Resets Carousel index safely)
  const handleCategoryChange = (cat) => {
    stopScrubbing();
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  // Safe navigation handlers with infinite loop
  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Click card handler (Active card opens modal; Side cards navigate to center)
  const handleCardClick = (offset, item) => {
    if (isDraggingRef.current) return;
    stopScrubbing();
    if (offset === 0) {
      setSelectedProject(item);
    } else {
      setActiveIndex((prev) => (prev + offset + total * 100) % total);
    }
  };

  // Screen resize & Reduced motion detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    return () => {
      stopScrubbing();
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', motionHandler);
    };
  }, [stopScrubbing]);

  // Keyboard navigation when carousel container is focused
  const handleKeyDown = (e) => {
    stopScrubbing();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Mouse wheel navigation only when intentional (horizontal scroll or shift+scroll)
  // Ensures normal page vertical scrolling is NEVER hijacked!
  const handleWheel = (e) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (isHorizontal || e.shiftKey) {
      e.preventDefault();
      stopScrubbing();
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 300) {
        if (e.deltaX > 20 || (e.shiftKey && e.deltaY > 20)) {
          handleNext();
          lastWheelTimeRef.current = now;
        } else if (e.deltaX < -20 || (e.shiftKey && e.deltaY < -20)) {
          handlePrev();
          lastWheelTimeRef.current = now;
        }
      }
    }
  };

  // Build visible cards list around activeIndex with memoization for 120fps performance
  const visibleCards = useMemo(() => {
    if (total === 0) return [];
    if (total === 1) {
      return [{ offset: 0, project: filteredProjects[0] }];
    }
    if (total === 2) {
      return [
        { offset: 0, project: filteredProjects[activeIndex] },
        { offset: 1, project: filteredProjects[(activeIndex + 1) % 2] },
      ];
    }
    if (total < 5 || isMobile) {
      // 3-card presentation
      return [-1, 0, 1].map((offset) => ({
        offset,
        project: filteredProjects[(activeIndex + offset + total * 100) % total],
      }));
    }
    // Full 5-card 3D perspective presentation
    return [-2, -1, 0, 1, 2].map((offset) => ({
      offset,
      project: filteredProjects[(activeIndex + offset + total * 100) % total],
    }));
  }, [total, isMobile, filteredProjects, activeIndex]);

  return (
    <section id="work" className="relative py-16 sm:py-24 lg:py-28 bg-transparent z-10 overflow-hidden">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">

        {/* ── Section Header Row ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Section Tag Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2E0B5B]/40 border border-[#A855F7]/35 shadow-[0_0_12px_rgba(168,85,247,0.2)] backdrop-blur-md mb-6">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
                SELECTED WORK
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-white tracking-tight font-display leading-[1.08]">
              Proven Work.{' '}
              <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF5500] to-[#E02696] bg-clip-text text-transparent">
                Tangible Impact.
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-300/85 font-normal mt-3.5 leading-relaxed max-w-xl">
              Authentic projects and creative campaigns delivered for leading retail giants, e-commerce engines, and growing enterprises.
            </p>
          </div>

          {/* Category Filter Pills (Exact preserved labels & styles) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeCategory === cat
                    ? 'bg-gradient-to-r from-[#FF7A00] via-[#E11D48] to-[#D946EF] text-white shadow-[0_4px_20px_rgba(255,106,0,0.4)] scale-[1.02]'
                    : 'bg-[#120B29]/70 text-slate-300 hover:text-white border border-white/12 hover:border-white/25 backdrop-blur-md'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3D Perspective Coverflow Carousel Stage ───────────────── */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          aria-label="3D Projects Showcase Carousel"
          className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center justify-center focus:outline-none select-none"
          style={{
            perspective: isMobile ? '1000px' : '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle 3D Floor Lighting Plane */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-12 bg-gradient-to-t from-transparent via-[#FF7A00]/12 to-transparent blur-2xl pointer-events-none rounded-full" />

          {/* Left Navigation Chevron Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stopScrubbing();
                handlePrev();
              }}
              aria-label="Previous project"
              className="absolute left-1 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0D0922]/85 backdrop-blur-xl border border-white/15 text-white/80 hover:text-white hover:border-[#FF7A00]/60 hover:shadow-[0_0_24px_rgba(255,122,0,0.4)] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 group shadow-xl"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}

          {/* Interactive Drag & Swipe Track */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragStart={() => {
              isDraggingRef.current = true;
              stopScrubbing();
            }}
            onDragEnd={(e, info) => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 80);
              const swipeThreshold = 40;
              const velocityThreshold = 280;
              if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                handlePrev();
              } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                handleNext();
              }
            }}
            className="relative w-full h-full min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Center Anchor Point: (0, 0) is the center of the stage */}
            <div
              className="absolute left-1/2 top-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {visibleCards.map(({ offset, project }) => (
                <Portfolio3DCard
                  key={project.id}
                  item={project}
                  offset={offset}
                  isActive={offset === 0}
                  onClick={() => handleCardClick(offset, project)}
                  prefersReducedMotion={prefersReducedMotion}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Navigation Chevron Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stopScrubbing();
                handleNext();
              }}
              aria-label="Next project"
              className="absolute right-1 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0D0922]/85 backdrop-blur-xl border border-white/15 text-white/80 hover:text-white hover:border-[#FF7A00]/60 hover:shadow-[0_0_24px_rgba(255,122,0,0.4)] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 group shadow-xl"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>

        {/* ── Active Project Pagination & Readout Bar ───────────────── */}
        {total > 1 && (
          <div className="flex flex-col items-center gap-3.5 mt-6 sm:mt-8 relative z-30">
            {/* Dots navigation */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0A071E]/80 border border-white/10 backdrop-blur-md shadow-lg">
              {filteredProjects.map((p, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={p.id || idx}
                    onClick={() => {
                      stopScrubbing();
                      setActiveIndex(idx);
                    }}
                    onMouseEnter={() => {
                      if (idx !== activeIndex) {
                        stopScrubbing();
                        setActiveIndex(idx);
                      }
                    }}
                    aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${isCurrent
                        ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-[#FF7A00] to-[#E02696] shadow-[0_0_12px_rgba(255,122,0,0.6)]'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/25 hover:bg-white/50 hover:scale-125'
                      }`}
                  />
                );
              })}
            </div>

            {/* Project Counter and Title readout */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-400">
              <span className="text-white font-bold tracking-wider">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/30">/</span>
              <span>{String(total).padStart(2, '0')}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-slate-200 font-sans font-semibold">
                {filteredProjects[activeIndex]?.client}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* ── Interactive Project Deep-Dive Modal (100% Preserved) ───── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#0D0922]/95 border border-white/15 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
            style={{ borderColor: selectedProject.accentColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Media Preview */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#070514] border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 text-slate-200 backdrop-blur-md border border-white/20">
                  {selectedProject.client}
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: selectedProject.accentColor,
                  boxShadow: `0 0 10px ${selectedProject.accentColor}`,
                }}
              />
              <span
                className="text-xs uppercase tracking-widest font-mono font-semibold"
                style={{ color: selectedProject.accentColor }}
              >
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-display">
              {selectedProject.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Deliverables / Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
                Key Scope & Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-slate-200"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      style={{ color: selectedProject.accentColor }}
                    />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Interested in similar outcomes for your brand?
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Discuss {selectedProject.title}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
