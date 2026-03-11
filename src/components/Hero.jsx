import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(Observer, ScrollTrigger);

const FRAME_COUNT = 19;

// ── Canvas helper: draw image as "object-cover" ──
function drawCover(ctx, img, cw, ch) {
  if (!img || !img.width || !img.height || !cw || !ch) return;
  const iw = img.width, ih = img.height;
  const scale = Math.max(cw / iw, ch / ih);
  const nw = iw * scale, nh = ih * scale;
  const ox = (cw - nw) / 2, oy = (ch - nh) / 2;
  ctx.drawImage(img, 0, 0, iw, ih, ox, oy, nw, nh);
}


// ══════════════════════════════════════════════════════════════════════
//  Hero Component
// ══════════════════════════════════════════════════════════════════════
const Hero = () => {
  const sectionRef = useRef(null);

  // Canvas refs
  const bgCanvasRef = useRef(null); // Robot frames

  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });
  const textWrapRefs = useRef([]);
  const brushMaskRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);

  // GSAP Observer & State
  const isAnimatingRef = useRef(false);
  const currentStageRef = useRef(0);
  const observerRef = useRef(null);

  // Auto Scroll Timer
  const autoScrollTimerRef = useRef(null);
  // Scroll hint ref
  const scrollHintRef = useRef(null);

  const resetAutoScroll = useCallback((stageToWatch) => {
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    if (stageToWatch !== undefined && stageToWatch < 3) {
      autoScrollTimerRef.current = setTimeout(() => {
        if (currentStageRef.current === stageToWatch && !isAnimatingRef.current) {
          gotoStage(stageToWatch + 1, 1);
        }
      }, 5000);
    }
  }, []);

  // ── 1. Preload frames ──
  useEffect(() => {
    let count = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/hero_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        imagesRef.current[i - 1] = img;
        count++;
        if (count === FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        count++;
        if (count === FRAME_COUNT) setLoaded(true);
      };
    }
  }, []);


  // ── 4. Render Robot Frame ──
  const renderFrame = useCallback((index) => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }
    ctx.clearRect(0, 0, w, h);
    const safeIdx = Math.max(0, Math.min(Math.round(index), FRAME_COUNT - 1));
    const img = imagesRef.current[safeIdx];
    if (img) drawCover(ctx, img, w, h);
  }, []);

  useEffect(() => {
    if (loaded) {
      renderFrame(frameIndexRef.current.value);
      resetAutoScroll(0);
    }
  }, [loaded, renderFrame, resetAutoScroll]);

  // ── 5. Stage Transitions ──

  const gotoStage = useCallback((targetStage, direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);

    // Hide scroll hint purely through local state to prevent conflicts
    if (!scrollStarted) {
      setScrollStarted(true);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock immediately to make scroll steps snappy and reliable
        isAnimatingRef.current = false;
        resetAutoScroll(targetStage);
        currentStageRef.current = targetStage;
      }
    });

    const isForward = direction === 1;
    const wrapOpts = { opacity: 0, xPercent: isForward ? -130 : 130 };
    const exitOpts = { opacity: 0, xPercent: isForward ? 130 : -130, ease: "power3.in" };

    // Frame animations mapped to stages
    const frameTargets = { 0: 0, 1: 6, 2: 12, 3: 18 };
    tl.to(frameIndexRef.current, {
      value: frameTargets[targetStage],
      duration: 1.2,
      ease: "power2.inOut",
      // the loop handles rendering automatically now via requestAnimationFrame
    }, 0);

    // Transition Logic
    const currWrap = currentStageRef.current > 0 ? textWrapRefs.current[currentStageRef.current - 1] : null;
    const currMask = currentStageRef.current > 0 ? brushMaskRefs.current[currentStageRef.current - 1] : null;
    const nextWrap = targetStage > 0 ? textWrapRefs.current[targetStage - 1] : null;
    const nextMask = targetStage > 0 ? brushMaskRefs.current[targetStage - 1] : null;

    if (isForward) {
      if (currWrap && currMask) {
        tl.to(currWrap, { ...exitOpts, duration: 0.3 }, 0);
        tl.set(currMask, { '--brush-reveal': '0%' }, 0.3);
      }
      if (nextWrap && nextMask) {
        tl.fromTo(nextWrap, wrapOpts, { xPercent: 0, opacity: 1, duration: 0.2, ease: "power4.out" }, 0.3);
        tl.fromTo(nextMask, { '--brush-reveal': '0%' }, { '--brush-reveal': '120%', duration: 0.6, ease: "power2.out" }, 0.4);
        tl.to(nextWrap, { keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.1, ease: 'none' }, 0.9);
      }
    } else {
      if (currWrap && currMask) {
        tl.to(currWrap, { ...exitOpts, duration: 0.3 }, 0);
        tl.set(currMask, { '--brush-reveal': '0%' }, 0.3);
      }
      if (nextWrap && nextMask) {
        tl.fromTo(nextWrap, wrapOpts, { xPercent: 0, opacity: 1, duration: 0.2, ease: "power4.out" }, 0.3);
        tl.fromTo(nextMask, { '--brush-reveal': '0%' }, { '--brush-reveal': '120%', duration: 0.6, ease: "power2.out" }, 0.4);
        tl.to(nextWrap, { keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.1, ease: 'none' }, 0.9);
      } else if (targetStage === 0) {
        // Bring back scroll state
        setScrollStarted(false);
      }
    }
  }, [scrollStarted, renderFrame, resetAutoScroll]);

  // ── 6. Setup GSAP Observer ──
  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 30,
      preventDefault: true,
      onUp: () => {
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (currentStageRef.current < 3 && !isAnimatingRef.current) {
          gotoStage(currentStageRef.current + 1, 1);
        } else if (currentStageRef.current === 3 && !isAnimatingRef.current) {
          observer.disable();
        }
      },
      onDown: () => {
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (currentStageRef.current > 0 && !isAnimatingRef.current) {
          gotoStage(currentStageRef.current - 1, -1);
        }
      }
    });

    observerRef.current = observer;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onEnterBack: () => {
        observer.enable();
        window.scrollTo({ top: 0 });
      }
    });

    return () => {
      observer.kill();
      trigger.kill();
    };
  }, [gotoStage]);

  return (
    <section ref={sectionRef} id="home" className="hero-section relative overflow-hidden bg-black" style={{ touchAction: 'none' }}>

      {/* ── Background Gradient (Layer 1 Background - Z: 0) ── */}
      <div className="absolute inset-0 z-0 hero-gradient-bg" />

      {/* ── Dark Overlay to dim the background (Z: 2) ── */}
      <div className="absolute inset-0 z-[2] hero-overlay pointer-events-none opacity-50" />

      {/* ── Robot Face Mask (Layer 2 Robot Mask - Z: 10) ── */}
      {/* We removed bats, so we don't need mix-blend-mode to let bats show through. */}
      {/* We just draw the robot canvas natively. */}
      <div className="hero-canvas-wrap relative z-[10]">
        <canvas ref={bgCanvasRef} className="hero-canvas" />
      </div>

      {/* ── Overlay effects matching Robot depth (Z: 20) ── */}
      <div className="hero-scanline z-[20] pointer-events-none" />
      <div className="hero-eye-glow z-[20] pointer-events-none" />

      {/* ── Text Container (Z: 25) — ABOVE bats ── */}
      <div className="hero-text-container z-[25]">
        <div ref={(el) => (textWrapRefs.current[0] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[0] = el)} className="brush-mask hero-text-name">
            Hi, I'm <span className="hero-highlight">Stalin</span>
          </div>
        </div>

        <div ref={(el) => (textWrapRefs.current[1] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[1] = el)} className="brush-mask hero-text-title">
            <span className="block">Creative Developer</span>
            <span className="block"><span className="font-light mr-3">&</span><span className="hero-highlight hero-highlight-italic">AI Enthusiast</span></span>
          </div>
        </div>

        <div ref={(el) => (textWrapRefs.current[2] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[2] = el)} className="brush-mask hero-text-desc text-center stage-3-container">
            <span className="block stage-3-line1 font-black">I BUILD</span>
            <span className="block stage-3-line2 font-black hero-highlight glowing-text">INTELLIGENT TOOLS</span>
            <span className="block stage-3-line3 font-black">& MODERN <span className="hero-highlight glowing-text">WEB APPS</span></span>
            <span className="block stage-3-subtitle mt-4 opacity-80 backdrop-blur-sm rounded-lg py-1 px-3">Creating creative digital experiences</span>
          </div>
        </div>
      </div>

      {/* ── HUD Corners (Z: 30) ── */}
      <div className="hero-hud hero-hud-tl z-[30]" />
      <div className="hero-hud hero-hud-tr z-[30]" />
      <div className="hero-hud hero-hud-bl z-[30]" />
      <div className="hero-hud hero-hud-br z-[30]" />

      {/* ── Scroll Hint (Z: 35) ── */}
      <div
        ref={scrollHintRef}
        className="hero-scroll-hint z-[35] transition-all duration-700 ease-in-out"
        style={{ 
          opacity: loaded && !scrollStarted ? 1 : 0, 
          transform: loaded && !scrollStarted ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
          pointerEvents: scrollStarted ? 'none' : 'auto'
        }}
      >
        <div className="hero-scroll-arrow">↓</div>
        <span className="hero-scroll-label">Scroll to begin</span>
      </div>

      {/* ── Bottom Fade (Z: 40) ── */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-[40] pointer-events-none transition-colors duration-500" />
    </section>
  );
};

export default Hero;
