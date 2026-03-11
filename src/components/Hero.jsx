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
//  Bat Class — Proper silhouette with articulated wings & depth
// ══════════════════════════════════════════════════════════════════════
class Bat {
  constructor(x, y, depth) {
    this.x = x;
    this.y = y;
    // depth: 0 = far background, 1 = mid, 2 = near foreground
    this.depth = depth;

    // Size depends on depth for parallax feel
    const depthScale = depth === 0 ? 0.6 : depth === 1 ? 1.0 : 1.4;
    this.baseSize = (Math.random() * 6 + 8) * depthScale; // 8–14px base, scaled by depth
    this.size = this.baseSize;

    // Speed depends on depth: closer = faster
    const speedScale = depth === 0 ? 0.4 : depth === 1 ? 0.7 : 1.0;
    this.vx = ((Math.random() - 0.3) * 2 + 0.8) * speedScale; // mostly rightward drift
    this.vy = (Math.random() - 0.5) * 1.5 * speedScale;

    // Wing flap: individual frequency & phase for natural look
    this.flapFreq = Math.random() * 0.008 + 0.006; // radians per ms
    this.flapPhase = Math.random() * Math.PI * 2;

    // Gentle rotation oscillation
    this.rotationBase = 0;
    this.rotationOscFreq = Math.random() * 0.002 + 0.001;
    this.rotationOscAmp = Math.random() * 0.15 + 0.05; // subtle tilt

    this.timeOffset = Math.random() * 10000;
    this.state = 'wander'; // wander, form, explode
    this.targetX = 0;
    this.targetY = 0;
    this.explodeVx = 0;
    this.explodeVy = 0;

    // Opacity depends on depth
    this.opacity = depth === 0 ? 0.35 : depth === 1 ? 0.55 : 0.75;
  }

  update(width, height) {
    if (this.state === 'wander') {
      this.x += this.vx;
      this.y += this.vy;

      // Gentle sine-wave floating for organic feel
      this.y += Math.sin(Date.now() * 0.0008 + this.timeOffset) * 0.4;

      // AI Face Avoidance: push bats away from the central robot face
      const cx = width / 2;
      const cy = height / 2;
      const dxO = this.x - cx;
      const dyO = this.y - cy;
      const distO = Math.sqrt(dxO * dxO + dyO * dyO);
      const avoidRadius = Math.min(width, height) * 0.3;
      if (distO < avoidRadius && distO > 0) {
        const force = (avoidRadius - distO) / avoidRadius;
        this.x += (dxO / distO) * force * 2;
        this.y += (dyO / distO) * force * 2;
      }

      // Wrap around screen edges smoothly
      if (this.x > width + 60) this.x = -60;
      if (this.x < -60) this.x = width + 60;
      if (this.y < -30) { this.y = -30; this.vy = Math.abs(this.vy); }
      if (this.y > height + 30) { this.y = height + 30; this.vy = -Math.abs(this.vy); }

      // Base angle from movement direction
      this.rotationBase = Math.atan2(this.vy, this.vx);

    } else if (this.state === 'form') {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      this.x += dx * 0.08;
      this.y += dy * 0.08;
      this.rotationBase = Math.atan2(dy, dx);
    } else if (this.state === 'explode') {
      this.x += this.explodeVx;
      this.y += this.explodeVy;
      this.explodeVx *= 1.04;
      this.explodeVy *= 1.04;
      this.rotationBase = Math.atan2(this.explodeVy, this.explodeVx);

      if (this.x < -120 || this.x > width + 120 || this.y < -120 || this.y > height + 120) {
        this.state = 'wander';
        this.x = -60;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.3) * 2 + 0.8;
        this.vy = (Math.random() - 0.5) * 1.5;
      }
    }
  }

  draw(ctx, time) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Subtle rotation oscillation
    const rotOsc = Math.sin(time * this.rotationOscFreq + this.timeOffset) * this.rotationOscAmp;
    ctx.rotate(this.rotationBase + rotOsc);

    // Wing flap angle: smooth sine wave between -30° and +30°
    const flapAngle = Math.sin(time * this.flapFreq + this.flapPhase) * 0.5; // radians

    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#1a1a2e';

    const s = this.size;

    // ── Draw Body (small oval) ──
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.2, s * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Draw Left Wing ──
    ctx.save();
    ctx.rotate(flapAngle); // wing flap
    ctx.beginPath();
    ctx.moveTo(-s * 0.15, -s * 0.1);
    // Upper wing edge (swept back)
    ctx.bezierCurveTo(-s * 0.6, -s * 0.7, -s * 1.4, -s * 0.6, -s * 1.8, -s * 0.15);
    // Wing tip scallop (bat wing fingers)
    ctx.bezierCurveTo(-s * 1.5, -s * 0.05, -s * 1.3, s * 0.15, -s * 1.0, s * 0.05);
    ctx.bezierCurveTo(-s * 0.8, s * 0.15, -s * 0.5, s * 0.2, -s * 0.15, s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ── Draw Right Wing (mirrored) ──
    ctx.save();
    ctx.rotate(-flapAngle); // opposite flap
    ctx.beginPath();
    ctx.moveTo(s * 0.15, -s * 0.1);
    ctx.bezierCurveTo(s * 0.6, -s * 0.7, s * 1.4, -s * 0.6, s * 1.8, -s * 0.15);
    ctx.bezierCurveTo(s * 1.5, -s * 0.05, s * 1.3, s * 0.15, s * 1.0, s * 0.05);
    ctx.bezierCurveTo(s * 0.8, s * 0.15, s * 0.5, s * 0.2, s * 0.15, s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ── Small ears ──
    ctx.beginPath();
    ctx.moveTo(-s * 0.1, -s * 0.4);
    ctx.lineTo(-s * 0.2, -s * 0.65);
    ctx.lineTo(0, -s * 0.45);
    ctx.lineTo(s * 0.2, -s * 0.65);
    ctx.lineTo(s * 0.1, -s * 0.4);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

// ══════════════════════════════════════════════════════════════════════
//  Hero Component
// ══════════════════════════════════════════════════════════════════════
const Hero = () => {
  const sectionRef = useRef(null);

  // Canvas refs
  const bgCanvasRef = useRef(null); // Robot frames
  const batCanvasRef = useRef(null); // Single bat canvas (behind text)

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

  // Bats
  const batsRef = useRef([]);
  const batAnimRunning = useRef(false);
  const requestRef = useRef();

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

  // ── 2. Init Bats ONLY after images loaded ──
  useEffect(() => {
    if (!loaded) return;

    const isMobile = window.innerWidth < 768;
    const numBats = isMobile ? 10 : 25;
    const bats = [];
    for (let i = 0; i < numBats; i++) {
      // Distribute depth: 0 (far), 1 (mid), 2 (near)
      const depth = i % 3;
      // Spawn offscreen left so they fly in gracefully
      const startX = -(Math.random() * 200 + 50);
      const startY = Math.random() * window.innerHeight;
      bats.push(new Bat(startX, startY, depth));
    }
    batsRef.current = bats;
    batAnimRunning.current = true;
  }, [loaded]);

  // ── 3. Bat Animation Loop (only runs when batAnimRunning) ──
  const drawBats = useCallback((time) => {
    if (!batAnimRunning.current) return;

    const canvas = batCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    batsRef.current.forEach(bat => {
      bat.update(w, h);
      bat.draw(ctx, time);
    });

    requestRef.current = requestAnimationFrame(drawBats);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (batCanvasRef.current) {
        batCanvasRef.current.width = w;
        batCanvasRef.current.height = h;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Small delay so bats fly in after BG appears
    const batTimer = setTimeout(() => {
      requestRef.current = requestAnimationFrame(drawBats);
    }, 600);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(batTimer);
      cancelAnimationFrame(requestRef.current);
    };
  }, [loaded, drawBats]);

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

  // Helper to generate coordinates for STALIN text
  const generateSTALINTargets = (bats) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 800;
    tempCanvas.height = 200;
    const ctx = tempCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.font = '900 120px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('STALIN', 400, 100);

    const imgData = ctx.getImageData(0, 0, 800, 200).data;
    const pixels = [];
    for (let y = 0; y < 200; y += 4) {
      for (let x = 0; x < 800; x += 4) {
        const alpha = imgData[(y * 800 + x) * 4 + 3];
        if (alpha > 128) {
          pixels.push({ x, y });
        }
      }
    }

    bats.forEach(bat => {
      if (pixels.length > 0) {
        const p = pixels[Math.floor(Math.random() * pixels.length)];
        bat.targetX = p.x + (w / 2 - 400);
        bat.targetY = p.y + (h / 2 - 100);
      } else {
        bat.targetX = w / 2;
        bat.targetY = h / 2;
      }
    });
  };

  const gotoStage = useCallback((targetStage, direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);

    // Hide scroll hint on first scroll
    if (!scrollStarted) {
      setScrollStarted(true);
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' });
      }
    }

    let readingCooldownMs = 800;
    if (targetStage === 1) readingCooldownMs = 1500;
    else if (targetStage === 2) readingCooldownMs = 2500;
    else if (targetStage === 3) readingCooldownMs = 3500;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
          resetAutoScroll(targetStage);
        }, readingCooldownMs);
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
      onUpdate: () => renderFrame(frameIndexRef.current.value)
    }, 0);

    // Transition Logic
    const currWrap = currentStageRef.current > 0 ? textWrapRefs.current[currentStageRef.current - 1] : null;
    const currMask = currentStageRef.current > 0 ? brushMaskRefs.current[currentStageRef.current - 1] : null;
    const nextWrap = targetStage > 0 ? textWrapRefs.current[targetStage - 1] : null;
    const nextMask = targetStage > 0 ? brushMaskRefs.current[targetStage - 1] : null;

    if (isForward) {
      if (currentStageRef.current === 0 && targetStage === 1) {
        // Cinematic Start: Form STALIN -> Explode -> Show Text 1
        batsRef.current.forEach(b => b.state = 'form');
        generateSTALINTargets(batsRef.current);

        tl.to({}, { duration: 1.0 });

        tl.add(() => {
          batsRef.current.forEach(b => {
            b.state = 'explode';
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const angle = Math.atan2(b.y - cy, b.x - cx);
            b.explodeVx = Math.cos(angle) * (Math.random() * 10 + 5);
            b.explodeVy = Math.sin(angle) * (Math.random() * 10 + 5);
          });
        }, "+=0.2");

        if (nextWrap && nextMask) {
          tl.fromTo(nextWrap, wrapOpts, { xPercent: 0, opacity: 1, duration: 0.2, ease: "power4.out" }, "+=0.1");
          tl.fromTo(nextMask, { '--brush-reveal': '0%' }, { '--brush-reveal': '120%', duration: 0.6, ease: "power2.out" }, "-=0.1");
          tl.to(nextWrap, { keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.1, ease: 'none' }, "-=0.1");
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
        }
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
        tl.add(() => {
          batsRef.current.forEach(b => {
            b.state = 'wander';
            b.vx = (Math.random() - 0.3) * 2 + 0.8;
            b.vy = (Math.random() - 0.5) * 1.5;
          });
        });
        // Bring scroll hint back
        if (scrollHintRef.current) {
          tl.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        }
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

      {/* ── Background Gradient (Z: 0) ── */}
      <div className="absolute inset-0 z-0 hero-gradient-bg" />

      {/* ── Robot Face Canvas (Z: 5) ── */}
      <div className="hero-canvas-wrap relative z-[5]">
        <canvas ref={bgCanvasRef} className="hero-canvas" />
      </div>

      {/* ── Dark Overlay (Z: 10) ── */}
      <div className="absolute inset-0 z-[10] hero-overlay pointer-events-none" />
      <div className="hero-scanline z-[10] pointer-events-none" />
      <div className="hero-eye-glow z-[10] pointer-events-none" />

      {/* ── Bat Canvas (Z: 15) — BELOW text so text is always readable ── */}
      <canvas ref={batCanvasRef} className="absolute inset-0 z-[15] pointer-events-none" />

      {/* ── Text Container (Z: 25) — ABOVE bats ── */}
      <div className="hero-text-container z-[25]">
        <div ref={(el) => (textWrapRefs.current[0] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[0] = el)} className="brush-mask hero-text-name">
            Hi, I'm <span className="hero-highlight">Stalin</span>
          </div>
        </div>

        <div ref={(el) => (textWrapRefs.current[1] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[1] = el)} className="brush-mask hero-text-title">
            <span className="block">Creative Developer &</span>
            <span className="block hero-highlight hero-highlight-italic">AI Enthusiast</span>
          </div>
        </div>

        <div ref={(el) => (textWrapRefs.current[2] = el)} className="hero-text-stage" style={{ opacity: 0 }}>
          <div ref={(el) => (brushMaskRefs.current[2] = el)} className="brush-mask hero-text-desc text-center">
            I build <span className="hero-highlight mx-1">intelligent tools</span>,
            modern <span className="hero-highlight mx-1">web apps</span>,<br/>
            and creative <span className="hero-highlight mx-1">digital experiences</span>.
          </div>
        </div>
      </div>

      {/* ── HUD Corners (Z: 30) ── */}
      <div className="hero-hud hero-hud-tl z-[30]" />
      <div className="hero-hud hero-hud-tr z-[30]" />
      <div className="hero-hud hero-hud-bl z-[30]" />
      <div className="hero-hud hero-hud-br z-[30]" />

      {/* ── Scroll Hint (Z: 35) — Visible immediately, disappears on first scroll ── */}
      <div
        ref={scrollHintRef}
        className="hero-scroll-hint z-[35]"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
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
