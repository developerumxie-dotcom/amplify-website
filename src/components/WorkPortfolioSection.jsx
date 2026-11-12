import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { portfolioProjects } from '../data/websiteContent';
import styles from './WorkPortfolioSection.module.css';

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
        userSelect: 'none',
      }}
    >
      <div
        onClick={onClick}
        className={`${styles.cardChassis} ${isActive ? styles.cardActive : styles.cardInactive}`}
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
        <div className={styles.cardTopSheen} />

        {/* Active Card Inner Glow Rim */}
        {isActive && (
          <div
            className={styles.cardActiveGlow}
            style={{ boxShadow: `inset 0 0 28px ${item.accentColor}35` }}
          />
        )}

        {/* Side Card Dimming Overlay (Maintains Center Focus) */}
        {!isActive && (
          <div className={styles.cardSideDimming} />
        )}

        {/* Media Thumbnail Container with Fast Loading & Skeleton */}
        <div className={styles.mediaContainer}>
          {!loaded && (
            <div className={styles.mediaSkeleton} />
          )}
          <img
            src={item.image}
            alt={item.title}
            decoding="async"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`${styles.mediaImg} ${isActive ? styles.mediaImgZoom : ''} ${loaded ? styles.mediaImgLoaded : styles.mediaImgLoading}`}
          />
          {/* Soft bottom vignette overlay */}
          <div className={styles.mediaVignette} />

          {/* Client Tag Pill with subtle accent border */}
          <div className={styles.clientTagWrap}>
            <span
              className={styles.clientTagPill}
              style={{ borderColor: `${item.accentColor}40` }}
            >
              {item.client}
            </span>
          </div>

          {/* Active Card Badge */}
          {isActive && (
            <div className={styles.activeBadgeWrap}>
              <span
                className={styles.activeBadgePill}
                style={{ borderColor: `${item.accentColor}60` }}
              >
                <span
                  className={styles.activePulseDot}
                  style={{ backgroundColor: item.accentColor }}
                />
                ACTIVE
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          <div>
            {/* Category with glowing accent dot */}
            <div className={styles.categoryRow}>
              <span
                className={styles.categoryDot}
                style={{
                  backgroundColor: item.accentColor,
                  boxShadow: `0 0 8px ${item.accentColor}`,
                }}
              />
              <span
                className={styles.categoryText}
                style={{ color: item.accentColor }}
              >
                {item.category}
              </span>
            </div>

            <h3 className={styles.cardTitle}>
              {item.title}
            </h3>

            <p className={styles.cardDesc}>
              {item.description}
            </p>
          </div>

          {/* Tags & Action Button Row */}
          <div
            className={styles.cardFooterRow}
            style={{ borderColor: `${item.accentColor}25` }}
          >
            <div className={styles.tagsContainer}>
              {item.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className={styles.tagItem}
                  style={{
                    borderColor: `${item.accentColor}35`,
                    backgroundColor: `${item.accentColor}12`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.actionBtnWrapper}>
              {isActive && (
                <span className={styles.scopeText}>
                  View Scope
                </span>
              )}
              <div
                className={`${styles.arrowCircleBtn} ${isActive ? styles.arrowCircleBtnActive : styles.arrowCircleBtnInactive}`}
                style={{ borderColor: `${item.accentColor}50` }}
              >
                <ArrowRight className={styles.arrowIcon} />
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

  // Safe Category Filter Switcher
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

  // Mouse wheel navigation only when intentional
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
    <section id="work" className={styles.workSection}>
      <div className={styles.container}>

        {/* ── Section Header Row ────────────────────────────────────── */}
        <div className={styles.headerRow}>
          <div className={styles.headerTextCol}>
            {/* Section Tag Pill */}
            <div className={styles.tagPill}>
              <span className={styles.tagPillText}>
                SELECTED WORK
              </span>
            </div>

            <h2 className={styles.heading}>
              Proven Work.{' '}
              <span className={styles.headingGradient}>
                Tangible Impact.
              </span>
            </h2>
            <p className={styles.subtitle}>
              Authentic projects and creative campaigns delivered for leading retail giants, e-commerce engines, and growing enterprises.
            </p>
          </div>

          {/* Category Filter Pills (Exact preserved labels & styles with Optical Glass) */}
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`${styles.filterBtn} ${
                  activeCategory === cat
                    ? `glass-btn-luminous ${styles.filterBtnActive}`
                    : `glass-btn-clear ${styles.filterBtnInactive}`
                }`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.filterCutLine} />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.filterGlare} />

                <span className={styles.filterBtnText}>{cat}</span>
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
          className={styles.stage}
          style={{
            perspective: isMobile ? '1000px' : '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle 3D Floor Lighting Plane */}
          <div className={styles.floorGlow} />

          {/* Left Navigation Chevron Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stopScrubbing();
                handlePrev();
              }}
              aria-label="Previous project"
              className={`${styles.navChevronBtn} ${styles.navChevronPrev}`}
            >
              <ChevronLeft className={styles.chevronSvg} />
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
            className={styles.stageTrack}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Center Anchor Point: (0, 0) is the center of the stage */}
            <div
              className={styles.stageCenterAnchor}
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
              className={`${styles.navChevronBtn} ${styles.navChevronNext}`}
            >
              <ChevronRight className={styles.chevronSvg} />
            </button>
          )}
        </div>

        {/* ── Active Project Pagination & Readout Bar ───────────────── */}
        {total > 1 && (
          <div className={styles.paginationWrapper}>
            {/* Dots navigation */}
            <div className={styles.dotsContainer}>
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
                    className={`${styles.dotBtn} ${isCurrent ? styles.dotActive : styles.dotInactive}`}
                  />
                );
              })}
            </div>

            {/* Project Counter and Title readout */}
            <div className={styles.counterReadout}>
              <span className={styles.currentNum}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSlash}>/</span>
              <span>{String(total).padStart(2, '0')}</span>
              <span className={styles.counterDot} />
              <span className={styles.currentClientName}>
                {filteredProjects[activeIndex]?.client}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* ── Interactive Project Deep-Dive Modal (100% Preserved) ───── */}
      {selectedProject && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={styles.modalDialog}
            style={{ borderColor: selectedProject.accentColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className={styles.modalCloseBtn}
              aria-label="Close dialog"
            >
              <X className={styles.modalCloseIcon} />
            </button>

            {/* Modal Media Preview */}
            <div className={styles.modalMediaWrap}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className={styles.modalMediaImg}
              />
              <div className={styles.modalClientPillWrap}>
                <span className={styles.modalClientPill}>
                  {selectedProject.client}
                </span>
              </div>
            </div>

            {/* Header */}
            <div className={styles.modalCategoryRow}>
              <span
                className={styles.modalCategoryDot}
                style={{
                  backgroundColor: selectedProject.accentColor,
                  boxShadow: `0 0 10px ${selectedProject.accentColor}`,
                }}
              />
              <span
                className={styles.modalCategoryText}
                style={{ color: selectedProject.accentColor }}
              >
                {selectedProject.category}
              </span>
            </div>

            <h3 className={styles.modalTitle}>
              {selectedProject.title}
            </h3>

            <p className={styles.modalDesc}>
              {selectedProject.description}
            </p>

            {/* Deliverables / Tags */}
            <div className={styles.scopeDeliverablesWrap}>
              <h4 className={styles.scopeDeliverablesHeading}>
                Key Scope & Deliverables
              </h4>
              <div className={styles.scopeDeliverablesList}>
                {selectedProject.tags.map((t, idx) => (
                  <div
                    key={idx}
                    className={styles.deliverablePill}
                  >
                    <CheckCircle2
                      className={styles.checkCircleIcon}
                      style={{ color: selectedProject.accentColor }}
                    />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>
                Interested in similar outcomes for your brand?
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className={`glass-btn-luminous ${styles.modalCtaBtn}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.modalCtaCutLine} />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.modalCtaGlare} />

                <span>Discuss {selectedProject.title}</span>
                <ArrowRight className={styles.modalCtaArrowIcon} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
