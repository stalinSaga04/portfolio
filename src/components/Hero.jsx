import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

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
  const bgCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });

  // Text refs — 3 stages (0, 1, 2)
  const textWrapRefs = useRef([]);
  const brushMaskRefs = useRef([]); // only stages 0 & 1 use brush-mask
  const scrollHintRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  // Mutable refs for scroll state (no re-renders needed)
  const isAnimatingRef = useRef(false);
  const currentStageRef = useRef(0);
  const observerRef = useRef(null);
  const momentumTimerRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  // ── 1. Preload all 19 frames ──
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

  // ── 2. Render a specific frame to the canvas ──
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

  // ── 3. Draw initial frame once loaded ──
  useEffect(() => {
    if (loaded) {
      renderFrame(0);
    }
  }, [loaded, renderFrame]);

  // ── 4. gotoStage — the core animation engine ──
  // We use a ref-based approach so this function NEVER goes stale.
  const renderFrameRef = useRef(renderFrame);
  renderFrameRef.current = renderFrame;

  const gotoStage = useCallback((targetStage, direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);

    const currentStage = currentStageRef.current;
    const isForward = direction === 1;

    const tl = gsap.timeline({
      onComplete: () => {
        currentStageRef.current = targetStage;

        // Start auto-scroll timer for next stage
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (targetStage < 2) {
          autoScrollTimerRef.current = setTimeout(() => {
            if (currentStageRef.current === targetStage && !isAnimatingRef.current) {
              gotoStage(targetStage + 1, 1);
            }
          }, 5000);
        }

        // Cooldown: 300ms base, extended by any lingering momentum events
        momentumTimerRef.current = setTimeout(() => {
          isAnimatingRef.current = false;
          momentumTimerRef.current = null;
        }, 300);
      }
    });

    // ─── A. Frame scrub (Iron Man mask open/close) ───
    const frameTargets = { 0: 0, 1: 9, 2: 18 };
    tl.to(frameIndexRef.current, {
      value: frameTargets[targetStage],
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        renderFrameRef.current(frameIndexRef.current.value);
      }
    }, 0);

    // ─── B. Text transitions ───
    const wrapStart = { opacity: 0, scale: 0.95, y: isForward ? 80 : -80 };
    const wrapExit  = { opacity: 0, scale: 1.05, y: isForward ? -80 : 80, ease: "power3.in", duration: 0.4 };

    const currWrap = textWrapRefs.current[currentStage];
    const currMask = brushMaskRefs.current[currentStage]; // may be undefined for stage 2
    const nextWrap = textWrapRefs.current[targetStage];
    const nextMask = brushMaskRefs.current[targetStage]; // may be undefined for stage 2

    // Outgoing stage
    if (currWrap) {
      tl.to(currWrap, wrapExit, 0);
      // Only reset brush mask if this stage uses one (stages 0 & 1 only)
      if (currMask) {
        tl.set(currMask, { '--brush-reveal': '0%' }, 0.4);
      }
    }

    // Incoming stage
    if (nextWrap) {
      if (targetStage === 2) {
        // Stage 3: line-by-line staggered animation
        tl.fromTo(nextWrap, { opacity: 0, y: isForward ? 60 : -60, scale: 0.95 },
          { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.35);

        const l1  = nextWrap.querySelector('.stage-3-line1');
        const l2  = nextWrap.querySelector('.stage-3-line2');
        const l3  = nextWrap.querySelector('.stage-3-line3');
        const sub = nextWrap.querySelector('.stage-3-subtitle');

        if (l1)  tl.fromTo(l1,  { opacity: 0 },               { opacity: 1, duration: 0.5 }, 0.45);
        if (l2)  tl.fromTo(l2,  { y: 30, opacity: 0 },        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.55);
        if (l3)  tl.fromTo(l3,  { y: 30, opacity: 0 },        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.65);
        if (sub) tl.fromTo(sub, { opacity: 0 },                { opacity: 1, duration: 0.5 }, 0.8);
      } else {
        // Stages 0 & 1: brush-mask reveal
        tl.fromTo(nextWrap, wrapStart,
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
        if (nextMask) {
          tl.fromTo(nextMask, { '--brush-reveal': '0%' },
            { '--brush-reveal': '120%', duration: 0.8, ease: "power2.out" }, 0.5);
        }
      }
    }

    // ─── C. Scroll hint opacity ───
    if (scrollHintRef.current) {
      let hintOpacity = 1;
      if (targetStage === 1) hintOpacity = 0.4;
      if (targetStage === 2) hintOpacity = 0;
      tl.to(scrollHintRef.current, { opacity: hintOpacity, duration: 0.5 }, 0);
    }

  }, []); // No deps — uses only refs, never stale

  // ── 5. Initial Load Animation (fade in Stage 1 text + scroll hint) ──
  useEffect(() => {
    if (!loaded) return;
    
    document.body.style.overflow = "hidden";

    const wrap = textWrapRefs.current[0];
    const mask = brushMaskRefs.current[0];
    const hint = scrollHintRef.current;

    if (wrap && mask) {
      gsap.to(wrap, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.to(mask, { '--brush-reveal': '120%', duration: 1.5, ease: 'power2.out', delay: 0.3 });
    }
    if (hint) {
      gsap.to(hint, { opacity: 1, duration: 1.0, delay: 0.6 });
    }

    // Start auto-scroll timer for stage 0
    autoScrollTimerRef.current = setTimeout(() => {
      if (currentStageRef.current === 0 && !isAnimatingRef.current) {
        gotoStage(1, 1);
      }
    }, 5000);

    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, [loaded, gotoStage]);

  // ── 6. Setup GSAP Observer for scroll/touch/wheel ──
  useEffect(() => {
    if (!loaded) return;

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onChange: () => {
        // Extend cooldown on every lingering momentum event
        if (momentumTimerRef.current) {
          clearTimeout(momentumTimerRef.current);
          momentumTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
            momentumTimerRef.current = null;
          }, 150);
        }
      },
      onUp: () => {
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (currentStageRef.current < 2 && !isAnimatingRef.current) {
          gotoStage(currentStageRef.current + 1, 1);
        } else if (currentStageRef.current === 2 && !isAnimatingRef.current) {
          observer.disable();
          document.body.style.overflow = "auto";
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

    // Re-lock when user scrolls back to top from below hero
    const handleNativeScroll = () => {
      if (window.scrollY <= 0 && currentStageRef.current === 2 && !observer.isEnabled) {
        document.body.style.overflow = "hidden";
        observer.enable();
      }
    };
    window.addEventListener('scroll', handleNativeScroll);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      observer.kill();
      document.body.style.overflow = "auto";
    };
  }, [loaded, gotoStage]);

  // ══════════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════════
  return (
    <section ref={sectionRef} id="home" className="hero-section relative overflow-hidden bg-black" style={{ touchAction: 'none' }}>

      {/* Background Space Image (Z: 0) */}
      <img
        src="/hero_bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Dark Overlay — subtle dim so robot pops (Z: 2) */}
      <div className="absolute inset-0 z-[2] bg-black/30 pointer-events-none" />

      {/* Robot Face Canvas — Iron Man style frame animation (Z: 10) */}
      <div className="hero-canvas-wrap relative z-[10]">
        <canvas ref={bgCanvasRef} className="hero-canvas" />
      </div>

      {/* Overlay FX (Z: 20) */}
      <div className="hero-scanline z-[20] pointer-events-none" />
      <div className="hero-eye-glow z-[20] pointer-events-none" />

      {/* Text Container (Z: 25) */}
      <div className="hero-text-container z-[25]">
        
        {/* STAGE 1: "Hi, I'm Stalin" */}
        <div ref={(el) => (textWrapRefs.current[0] = el)} className="hero-text-stage" style={{ opacity: 0, transform: 'scale(0.9)' }}>
          <div ref={(el) => (brushMaskRefs.current[0] = el)} className="brush-mask hero-text-name">
            Hi, I'm <span className="hero-highlight">Stalin</span>
          </div>
        </div>

        {/* STAGE 2: "Creative Developer & AI Enthusiast" */}
        <div ref={(el) => (textWrapRefs.current[1] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[1] = el)} className="brush-mask hero-text-title">
            <span className="block">Creative Developer</span>
            <span className="block"><span className="font-light mr-3">&</span><span className="hero-highlight hero-highlight-italic">AI Enthusiast</span></span>
          </div>
        </div>

        {/* STAGE 3: New bold message — NO brush-mask, line-by-line animation */}
        <div ref={(el) => (textWrapRefs.current[2] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div className="hero-text-desc text-center stage-3-container">
            <span className="block stage-3-line1 font-black">BUILDING</span>
            <span className="block stage-3-line2 font-black hero-highlight glowing-text">NEXT-GEN PRODUCTS</span>
            <span className="block stage-3-line3 font-black">FOR THE MODERN WEB</span>
            <span className="block stage-3-subtitle mt-4">Turning ideas into powerful digital solutions</span>
          </div>
        </div>
      </div>

      {/* HUD Corners (Z: 30) */}
      <div className="hero-hud hero-hud-tl z-[30]" />
      <div className="hero-hud hero-hud-tr z-[30]" />
      <div className="hero-hud hero-hud-bl z-[30]" />
      <div className="hero-hud hero-hud-br z-[30]" />

      {/* Scroll Hint (Z: 35) */}
      <div ref={scrollHintRef} className="hero-scroll-hint z-[35]" style={{ opacity: 0 }}>
        <div className="hero-scroll-arrow">↓</div>
        <span className="hero-scroll-label">Scroll to begin</span>
      </div>
    </section>
  );
};

export default Hero;
