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

// ── Generate floating particles ──
function createParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 4,
    });
  }
  return particles;
}

// ══════════════════════════════════════════════════════════════════════
//  Hero Component — Cinematic AI Interface
// ══════════════════════════════════════════════════════════════════════
const Hero = () => {
  const sectionRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });

  // Text refs — 3 stages (0, 1, 2)
  const textWrapRefs = useRef([]);
  const brushMaskRefs = useRef([]);
  const scrollHintRef = useRef(null);

  // Cinematic intro refs
  const circuitOverlayRef = useRef(null);
  const particleContainerRef = useRef(null);
  const scanLineRef = useRef(null);
  const eyeGlowRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [particles] = useState(() => createParticles(30));

  // Mutable refs for scroll state
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

  // ── 2. Render a specific frame ──
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

  // ── 3. Draw initial frame ──
  useEffect(() => {
    if (loaded) renderFrame(18); // Start with mask CLOSED
  }, [loaded, renderFrame]);

  // ── 4. renderFrameRef (prevents stale closures) ──
  const renderFrameRef = useRef(renderFrame);
  renderFrameRef.current = renderFrame;

  // ══════════════════════════════════════════════════════════════════
  //  CINEMATIC INTRO SEQUENCE
  // ══════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!loaded) return;

    document.body.style.overflow = "hidden";

    // Set initial frame value for animation
    frameIndexRef.current.value = 18;

    const introTL = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        // Start auto-scroll timer after intro
        autoScrollTimerRef.current = setTimeout(() => {
          if (currentStageRef.current === 0 && !isAnimatingRef.current) {
            gotoStage(1, 1);
          }
        }, 5000);
      }
    });

    // Show scroll hint immediately
    if (scrollHintRef.current) {
      introTL.to(scrollHintRef.current, { opacity: 1, duration: 1 }, 0);
    }

    // ─── Phase 1 (0-2.5s): Mask Opening — animate from closed (18) to open (0) ───
    introTL.to(frameIndexRef.current, {
      value: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => renderFrameRef.current(frameIndexRef.current.value)
    }, 0);

    // ─── Phase 2 (3-6s): Circuit glow + floating particles ───
    if (circuitOverlayRef.current) {
      introTL.to(circuitOverlayRef.current, {
        opacity: 1, duration: 1.5, ease: "power2.inOut"
      }, 3);
    }
    if (particleContainerRef.current) {
      introTL.to(particleContainerRef.current, {
        opacity: 1, duration: 1.5, ease: "power2.inOut"
      }, 3.5);
    }

    // ─── Phase 3 (6-8s): Eye scan + eye glow intensify ───
    if (scanLineRef.current) {
      introTL.set(scanLineRef.current, { opacity: 1 }, 6);
      introTL.fromTo(scanLineRef.current,
        { left: '-10%' },
        { left: '110%', duration: 1.5, ease: "power1.inOut" }, 6);
      introTL.to(scanLineRef.current, { opacity: 0, duration: 0.3 }, 7.3);
    }
    if (eyeGlowRef.current) {
      introTL.to(eyeGlowRef.current, {
        opacity: 1, scale: 1.3, duration: 1.5, ease: "power2.out"
      }, 6);
    }

    // ─── Phase 4 (8s+): Text "Hi, I'm Stalin" reveal ───
    const wrap = textWrapRefs.current[0];
    const mask = brushMaskRefs.current[0];
    if (wrap && mask) {
      introTL.to(wrap, {
        opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out"
      }, 8);
      introTL.to(mask, {
        '--brush-reveal': '120%', duration: 1.5, ease: "power2.out"
      }, 8.2);
    }

    return () => {
      introTL.kill();
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // ══════════════════════════════════════════════════════════════════
  //  gotoStage — scroll-driven stage transitions
  // ══════════════════════════════════════════════════════════════════
  const gotoStage = useCallback((targetStage, direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);

    const currentStage = currentStageRef.current;
    const isForward = direction === 1;

    const tl = gsap.timeline({
      onComplete: () => {
        currentStageRef.current = targetStage;

        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (targetStage < 2) {
          autoScrollTimerRef.current = setTimeout(() => {
            if (currentStageRef.current === targetStage && !isAnimatingRef.current) {
              gotoStage(targetStage + 1, 1);
            }
          }, 5000);
        }

        momentumTimerRef.current = setTimeout(() => {
          isAnimatingRef.current = false;
          momentumTimerRef.current = null;
        }, 300);
      }
    });

    // Frame scrub (Iron Man mask open/close)
    const frameTargets = { 0: 0, 1: 9, 2: 18 };
    tl.to(frameIndexRef.current, {
      value: frameTargets[targetStage],
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => renderFrameRef.current(frameIndexRef.current.value)
    }, 0);

    // Text transitions
    const wrapStart = { opacity: 0, scale: 0.95, y: isForward ? 80 : -80 };
    const wrapExit = { opacity: 0, scale: 1.05, y: isForward ? -80 : 80, ease: "power3.in", duration: 0.4 };

    const currWrap = textWrapRefs.current[currentStage];
    const currMask = brushMaskRefs.current[currentStage];
    const nextWrap = textWrapRefs.current[targetStage];
    const nextMask = brushMaskRefs.current[targetStage];

    // Outgoing
    if (currWrap) {
      tl.to(currWrap, wrapExit, 0);
      if (currMask) tl.set(currMask, { '--brush-reveal': '0%' }, 0.4);
    }

    // Incoming
    if (nextWrap) {
      if (targetStage === 2) {
        tl.fromTo(nextWrap, { opacity: 0, y: isForward ? 60 : -60, scale: 0.95 },
          { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.35);

        const l1  = nextWrap.querySelector('.stage-3-line1');
        const l2  = nextWrap.querySelector('.stage-3-line2');
        const l3  = nextWrap.querySelector('.stage-3-line3');
        const sub = nextWrap.querySelector('.stage-3-subtitle');

        if (l1)  tl.fromTo(l1,  { opacity: 0 },        { opacity: 1, duration: 0.5 }, 0.45);
        if (l2)  tl.fromTo(l2,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.55);
        if (l3)  tl.fromTo(l3,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.65);
        if (sub) tl.fromTo(sub, { opacity: 0 },         { opacity: 1, duration: 0.5 }, 0.8);
      } else {
        tl.fromTo(nextWrap, wrapStart,
          { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
        if (nextMask) {
          tl.fromTo(nextMask, { '--brush-reveal': '0%' },
            { '--brush-reveal': '120%', duration: 0.8, ease: "power2.out" }, 0.5);
        }
      }
    }

    // Scroll hint
    if (scrollHintRef.current) {
      let hintOpacity = 1;
      if (targetStage === 1) hintOpacity = 0.4;
      if (targetStage === 2) hintOpacity = 0;
      tl.to(scrollHintRef.current, { opacity: hintOpacity, duration: 0.5 }, 0);
    }

  }, []); // No deps — uses only refs

  // ── 6. GSAP Observer (scroll control) ──
  useEffect(() => {
    if (!loaded) return;

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onChange: () => {
        if (momentumTimerRef.current) {
          clearTimeout(momentumTimerRef.current);
          momentumTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
            momentumTimerRef.current = null;
          }, 150);
        }
      },
      onUp: () => {
        if (!introComplete) return; // Block scrolling during intro
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (currentStageRef.current < 2 && !isAnimatingRef.current) {
          gotoStage(currentStageRef.current + 1, 1);
        } else if (currentStageRef.current === 2 && !isAnimatingRef.current) {
          observer.disable();
          document.body.style.overflow = "auto";
        }
      },
      onDown: () => {
        if (!introComplete) return;
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        if (currentStageRef.current > 0 && !isAnimatingRef.current) {
          gotoStage(currentStageRef.current - 1, -1);
        }
      }
    });

    observerRef.current = observer;

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
  }, [loaded, gotoStage, introComplete]);

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

      {/* Robot Face Canvas (Z: 10) */}
      <div className="hero-canvas-wrap relative z-[10]">
        <canvas ref={bgCanvasRef} className="hero-canvas" />
      </div>

      {/* ── Cinematic FX Layer (Z: 12) ── */}

      {/* Circuit Glow Lines — fade in at Phase 2 */}
      <div ref={circuitOverlayRef} className="hero-circuit-overlay z-[12]" style={{ opacity: 0 }}>
        <div className="circuit-line circuit-line-1" />
        <div className="circuit-line circuit-line-2" />
        <div className="circuit-line circuit-line-3" />
        <div className="circuit-line circuit-line-4" />
        <div className="circuit-line circuit-line-5" />
        <div className="circuit-line circuit-line-6" />
      </div>

      {/* Floating Particles — fade in at Phase 2 */}
      <div ref={particleContainerRef} className="hero-particles z-[12]" style={{ opacity: 0 }}>
        {particles.map(p => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Eye Scan Line — sweeps at Phase 3 */}
      <div ref={scanLineRef} className="hero-scan-line z-[15]" style={{ opacity: 0 }} />

      {/* Eye Glow — intensifies at Phase 3 */}
      <div ref={eyeGlowRef} className="hero-eye-glow z-[14]" style={{ opacity: 0.3 }} />

      {/* Scanline FX (Z: 20) */}
      <div className="hero-scanline z-[20] pointer-events-none" />

      {/* Text Container (Z: 25) */}
      <div className="hero-text-container z-[25]">
        
        {/* STAGE 1: "Hi, I'm Stalin" — hidden until Phase 4 */}
        <div ref={(el) => (textWrapRefs.current[0] = el)} className="hero-text-stage" style={{ opacity: 0, transform: 'scale(0.9)', pointerEvents: 'none' }}>
          <div ref={(el) => (brushMaskRefs.current[0] = el)} className="brush-mask hero-text-name">
            Hi, I'm <span className="hero-highlight">Stalin</span>
          </div>
        </div>

        {/* STAGE 2 */}
        <div ref={(el) => (textWrapRefs.current[1] = el)} className="hero-text-stage" style={{ opacity: 0, pointerEvents: 'none' }}>
          <div ref={(el) => (brushMaskRefs.current[1] = el)} className="brush-mask hero-text-title">
            <span className="block">Creative Developer</span>
            <span className="block"><span className="font-light mr-3">&</span><span className="hero-highlight hero-highlight-italic">AI Enthusiast</span></span>
          </div>
        </div>

        {/* STAGE 3 */}
        <div ref={(el) => (textWrapRefs.current[2] = el)} className="hero-text-stage" style={{ opacity: 0, pointerEvents: 'none' }}>
          <div className="hero-text-desc text-center stage-3-container">
            <span className="block stage-3-line1 font-black">BUILDING</span>
            <span className="block stage-3-line2 font-black hero-highlight glowing-text">NEXT-GEN PRODUCTS</span>
            <span className="block stage-3-line3 font-black">FOR THE MODERN WEB</span>
            <span className="block stage-3-subtitle mt-4">Turning ideas into powerful digital solutions</span>
          </div>
        </div>
      </div>


      {/* Scroll Hint (Z: 35) — visible from start */}
      <div ref={scrollHintRef} className="hero-scroll-hint z-[35]" style={{ opacity: 0 }}>
        <div className="hero-scroll-arrow">↓</div>
        <span className="hero-scroll-label">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
