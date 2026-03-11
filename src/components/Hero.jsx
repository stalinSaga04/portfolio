import React, { useRef, useEffect, useState } from 'react';
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

// ── Bat Swarm Generator ──
class Bat {
  constructor(x, y, zIndex) {
    this.x = x;
    this.y = y;
    this.zIndex = zIndex; // > 0 is foreground, < 0 is background
    this.baseSize = Math.random() * 4 + 4; // Much smaller bats
    this.size = this.baseSize;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.flapSpeed = Math.random() * 0.2 + 0.2;
    this.timeOffset = Math.random() * 100;
    this.state = 'wander'; // wander, form, explode
    this.targetX = 0;
    this.targetY = 0;
    this.angle = 0;
    this.explodeVx = 0;
    this.explodeVy = 0;
  }

  update(width, height) {
    if (this.state === 'wander') {
      // Swarm rightwards slowly, bounce Y
      this.x += this.vx * 0.5 + 1; // drift right
      this.y += this.vy * 0.5;
      
      // AI Face Avoidance: push bats away from the central robot face
      const cx = width / 2;
      const cy = height / 2;
      const dxOrigin = this.x - cx;
      const dyOrigin = this.y - cy;
      const distOrigin = Math.sqrt(dxOrigin * dxOrigin + dyOrigin * dyOrigin);
      if (distOrigin < 350) {
        const force = (350 - distOrigin) / 350;
        this.y += (dyOrigin / distOrigin) * force * 4; // Push vertically around the face
      }

      // Smooth floating instead of rapid vibration
      this.y += Math.sin(Date.now() * 0.001 + this.timeOffset) * 0.5;
      
      // Wrap around
      if (this.x > width + 50) this.x = -50;
      if (this.x < -50) this.x = width + 50;
      if (this.y < 0) this.vy *= -1;
      if (this.y > height) this.vy *= -1;
      
      this.angle = Math.atan2(this.vy, this.vx * 0.5 + 1);

    } else if (this.state === 'form') {
      // Move toward target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      this.x += dx * 0.08;
      this.y += dy * 0.08;
      this.angle = Math.atan2(dy, dx);
    } else if (this.state === 'explode') {
      // Fly outward fast
      this.x += this.explodeVx;
      this.y += this.explodeVy;
      
      this.explodeVx *= 1.05; // accelerate
      this.explodeVy *= 1.05;
      
      this.angle = Math.atan2(this.explodeVy, this.explodeVx);
      
      if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
        // Reset to wander after exploding off screen
        this.state = 'wander';
        this.x = -50;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
      }
    }
  }

  draw(ctx, time) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    
    // Simulate flap
    const flap = Math.sin(time * this.flapSpeed + this.timeOffset);
    ctx.scale(1, 0.8 + flap * 0.2); // Subtle squish for flapping, not drastic

    // Use a soft, subtle grey/black for bats so they look dark and cinematic,
    // not stark white which ruins the atmosphere.
    ctx.fillStyle = this.zIndex > 0 ? 'rgba(50, 60, 80, 0.85)' : 'rgba(20, 25, 40, 0.5)';
    
    ctx.beginPath();
    ctx.moveTo(0, 0); // Center body
    const s = this.size;
    
    // More natural, swept-back wing shapes
    // Left wing
    ctx.quadraticCurveTo(-s * 0.5, -s * 0.8, -s * 1.8, -s * 0.5);
    ctx.quadraticCurveTo(-s * 1.2, s * 0.2, 0, s * 0.8);
    // Right wing
    ctx.quadraticCurveTo(s * 1.2, s * 0.2, s * 1.8, -s * 0.5);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.8, 0, 0);
    
    ctx.fill();
    ctx.restore();
  }
}

const Hero = () => {
  const sectionRef = useRef(null);
  
  // Canvas refs
  const bgCanvasRef = useRef(null); // Robot frames
  const batBackCanvasRef = useRef(null); // Bats behind text
  const batFrontCanvasRef = useRef(null); // Bats in front of text
  
  const imagesRef = useRef([]);
  const frameIndexRef = useRef({ value: 0 });
  const textWrapRefs = useRef([]);
  const brushMaskRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);
  
  // GSAP Observer & State
  const isAnimatingRef = useRef(false);
  const currentStageRef = useRef(0); // 0 = Intro, 1 = Stage 1, 2 = Stage 2, 3 = Stage 3
  
  // Bats
  const batsRef = useRef([]);
  const requestRef = useRef();

  // Auto Scroll Timer
  const autoScrollTimerRef = useRef(null);

  const resetAutoScroll = (stageToWatch) => {
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    if (stageToWatch !== undefined && stageToWatch < 3) {
      autoScrollTimerRef.current = setTimeout(() => {
        if (currentStageRef.current === stageToWatch && !isAnimatingRef.current) {
          gotoStage(stageToWatch + 1, 1);
        }
      }, 5000); // Auto advance after 5 seconds of idle
    }
  };

  // ── 1. Init Bats ──
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const numBats = isMobile ? 15 : 30;
    const bats = [];
    for (let i = 0; i < numBats; i++) {
        // Half in front (>0), half behind (<0)
        const z = i % 2 === 0 ? 1 : -1;
        bats.push(new Bat(Math.random() * window.innerWidth, Math.random() * window.innerHeight, z));
    }
    batsRef.current = bats;
  }, []);

  // ── 2. Preload frames ──
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

  // ── 3. Bat Animation Loop ──
  const drawBats = (time) => {
    const bCanvas = batBackCanvasRef.current;
    const fCanvas = batFrontCanvasRef.current;
    if (!bCanvas || !fCanvas) return;

    const bCtx = bCanvas.getContext('2d');
    const fCtx = fCanvas.getContext('2d');
    const w = bCanvas.width;
    const h = bCanvas.height;

    bCtx.clearRect(0, 0, w, h);
    fCtx.clearRect(0, 0, w, h);

    batsRef.current.forEach(bat => {
      bat.update(w, h);
      if (bat.zIndex < 0) {
        bat.draw(bCtx, time);
      } else {
        bat.draw(fCtx, time);
      }
    });

    requestRef.current = requestAnimationFrame(drawBats);
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (batBackCanvasRef.current) {
        batBackCanvasRef.current.width = w;
        batBackCanvasRef.current.height = h;
      }
      if (batFrontCanvasRef.current) {
        batFrontCanvasRef.current.width = w;
        batFrontCanvasRef.current.height = h;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestRef.current = requestAnimationFrame(drawBats);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // ── 4. Render Robot Frame ──
  const renderFrame = (index) => {
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
  };

  useEffect(() => {
    if (loaded) {
      renderFrame(frameIndexRef.current.value);
      resetAutoScroll(0); // Start 5s timer for Stage 1 if user doesn't scroll
    }
  }, [loaded]);

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
      for(let y = 0; y < 200; y += 4) {
          for(let x = 0; x < 800; x += 4) {
              const alpha = imgData[(y * 800 + x) * 4 + 3];
              if (alpha > 128) {
                  pixels.push({x, y});
              }
          }
      }
      
      bats.forEach(bat => {
        if (pixels.length > 0) {
            const p = pixels[Math.floor(Math.random() * pixels.length)];
            bat.targetX = p.x + (w/2 - 400); 
            bat.targetY = p.y + (h/2 - 100);
        } else {
            bat.targetX = w/2;
            bat.targetY = h/2;
        }
      });
  };

  const gotoStage = (targetStage, direction) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);

    // Calculate dynamic reading cooldown based on the text length of the target stage
    // so users with slower reading speeds have forced time to read before they can skip.
    let readingCooldownMs = 800; // default for transitions
    if (targetStage === 1) {
      readingCooldownMs = 1500; // "Hi, I'm Stalin"
    } else if (targetStage === 2) {
      readingCooldownMs = 2500; // "Creative Developer & AI Enthusiast"
    } else if (targetStage === 3) {
      readingCooldownMs = 3500; // "I build intelligent tools..."
    }
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Enforce the reading cooldown to lock out scroll/swipe gestures
        // and absorb any raw trackpad inertia.
        setTimeout(() => {
          isAnimatingRef.current = false;
          resetAutoScroll(targetStage); // Restart 5s auto-scroll after cooldown
        }, readingCooldownMs);
        currentStageRef.current = targetStage;
      }
    });

    const isForward = direction === 1;
    const wrapOpts = { opacity: 0, xPercent: isForward ? -130 : 130 }; // enter from
    const exitOpts = { opacity: 0, xPercent: isForward ? 130 : -130, ease: "power3.in" }; // exit to

    // Frame animations mapped to stages
    const frameTargets = { 0: 0, 1: 6, 2: 12, 3: 18 };
    tl.to(frameIndexRef.current, {
        value: frameTargets[targetStage],
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => renderFrame(frameIndexRef.current.value)
    }, 0);

    // ── Transition Logic ──
    const currWrap = currentStageRef.current > 0 ? textWrapRefs.current[currentStageRef.current - 1] : null;
    const currMask = currentStageRef.current > 0 ? brushMaskRefs.current[currentStageRef.current - 1] : null;
    const nextWrap = targetStage > 0 ? textWrapRefs.current[targetStage - 1] : null;
    const nextMask = targetStage > 0 ? brushMaskRefs.current[targetStage - 1] : null;

    if (isForward) {
      if (currentStageRef.current === 0 && targetStage === 1) {
        // Cinematic Start: Form STALIN -> Explode -> Show Text 1
        batsRef.current.forEach(b => b.state = 'form');
        generateSTALINTargets(batsRef.current);
        
        tl.to({}, { duration: 1.0 }); // Wait for bats to form
        
        tl.add(() => {
           batsRef.current.forEach(b => {
               b.state = 'explode';
               // Explode outward from center of STALIN
               const cx = window.innerWidth / 2;
               const cy = window.innerHeight / 2;
               const angle = Math.atan2(b.y - cy, b.x - cx);
               b.explodeVx = Math.cos(angle) * (Math.random() * 10 + 5);
               b.explodeVy = Math.sin(angle) * (Math.random() * 10 + 5);
           });
        }, "+=0.2");

        // Immediately after explosion, text 1 enters
        if (nextWrap && nextMask) {
          tl.fromTo(nextWrap, wrapOpts, { xPercent: 0, opacity: 1, duration: 0.2, ease: "power4.out" }, "+=0.1");
          tl.fromTo(nextMask, { '--brush-reveal': '0%' }, { '--brush-reveal': '120%', duration: 0.6, ease: "power2.out" }, "-=0.1");
          tl.to(nextWrap, { keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.1, ease: 'none' }, "-=0.1");
        }
      } else {
        // Normal Forward Transition (1->2, 2->3)
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
      // Normal Backward Transition
      if (currWrap && currMask) {
         tl.to(currWrap, { ...exitOpts, duration: 0.3 }, 0);
         tl.set(currMask, { '--brush-reveal': '0%' }, 0.3);
      }
      if (nextWrap && nextMask) {
         tl.fromTo(nextWrap, wrapOpts, { xPercent: 0, opacity: 1, duration: 0.2, ease: "power4.out" }, 0.3);
         tl.fromTo(nextMask, { '--brush-reveal': '0%' }, { '--brush-reveal': '120%', duration: 0.6, ease: "power2.out" }, 0.4);
         tl.to(nextWrap, { keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: 0.1, ease: 'none' }, 0.9);
      } else if (targetStage === 0) {
         // Reversing back to 0 -> bring bats back? Just set state to wander.
         tl.add(() => {
           batsRef.current.forEach(b => {
               b.state = 'wander';
               b.vx = (Math.random() - 0.5) * 4;
               b.vy = (Math.random() - 0.5) * 4;
           });
         });
      }
    }
  };

  // ── 6. Setup GSAP Observer ──
  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 30, // threshold to trigger
      preventDefault: true, // lock normal scrolling
      onUp: () => {
         if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
         // Scroll down -> targetStage increases
         if (currentStageRef.current < 3 && !isAnimatingRef.current) {
            gotoStage(currentStageRef.current + 1, 1);
         } else if (currentStageRef.current === 3 && !isAnimatingRef.current) {
            // Unpin somehow or let natural scroll take over?
            // "The hero section must be pinned while the animation sequence plays"
            // If they scroll past stage 3, we should let them scroll down the page.
            // Using Observer, we usually disable it.
            observer.disable();
         }
      },
      onDown: () => {
         if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
         // Scroll up -> targetStage decreases
         if (currentStageRef.current > 0 && !isAnimatingRef.current) {
            gotoStage(currentStageRef.current - 1, -1);
         }
      }
    });
    
    // Re-enable observer if user scrolls back up into view
    const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onEnterBack: () => {
             observer.enable();
             // Prevent native scroll
             window.scrollTo({ top: 0 });
        }
    });

    return () => {
      observer.kill();
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero-section relative overflow-hidden bg-black" style={{ touchAction: 'none' }}>
      
      {/* ── Background Layer (Z: 0) ── */}
      <div className="absolute inset-0 z-0 hero-gradient-bg" />
      
      {/* ── Bat Back Canvas (Z: 5) - Behind Robot Face ── */}
      <canvas ref={batBackCanvasRef} className="absolute inset-0 z-5 pointer-events-none" />

      {/* ── Robot Face (Z: 10) ── */}
      <div className="hero-canvas-wrap relative z-10">
        <canvas ref={bgCanvasRef} className="hero-canvas" />
      </div>
      
      {/* ── Dark Overlay (Z: 15) ── */}
      <div className="absolute inset-0 z-[15] hero-overlay pointer-events-none" />
      <div className="hero-scanline z-[15] pointer-events-none" />
      <div className="hero-eye-glow z-[15] pointer-events-none" />

      {/* ── Text Container (Z: 20) ── */}
      <div className="hero-text-container z-20">
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

      {/* ── Bat Front Canvas (Z: 30) ── */}
      <canvas ref={batFrontCanvasRef} className="absolute inset-0 z-30 pointer-events-none" />

      {/* ── HUD and UI (Z: 40) ── */}
      <div className="hero-hud hero-hud-tl z-40" />
      <div className="hero-hud hero-hud-tr z-40" />
      <div className="hero-hud hero-hud-bl z-40" />
      <div className="hero-hud hero-hud-br z-40" />

      <div className="hero-scroll-hint z-40">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span className="hero-scroll-label">Scroll to explore</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-50 pointer-events-none transition-colors duration-500" />
    </section>
  );
};

export default Hero;
