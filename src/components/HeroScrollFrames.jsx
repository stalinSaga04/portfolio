import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 19;

/**
 * High-performance sequential image rendering on an HTML5 Canvas,
 * pinned to scroll progress. Achieves perfectly smooth scrubbing
 * without the lag of swapping <img src="..." /> paths.
 */
const HeroScrollFrames = ({ scrollYProgress }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]); // Stores in-memory Image objects
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // 1. Preload all 19 frame images into memory
    useEffect(() => {
        const loadImages = () => {
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const paddedIndex = i.toString().padStart(3, '0');
                const img = new Image();
                // Loading directly from public/hero_frames folder
                img.src = `/hero_frames/ezgif-frame-${paddedIndex}.jpg`;

                img.onload = () => {
                    imagesRef.current[i - 1] = img;
                    setImagesLoaded((prev) => prev + 1);
                };
            }
        };

        loadImages();
    }, []);

    // 2. Custom Draw Function to emulate CSS `object-cover`
    const drawImageProp = (ctx, img, x, y, w, h, offsetX, offsetY) => {
        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // Prevent NaN crashes if canvas or image dimensions are zero during initial render
        if (!w || !h || !img.width || !img.height) return;

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        let iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // Prevent strictly NaN or Infinity values which crash hardware acceleration
        if (!isFinite(cx) || !isFinite(cy) || !isFinite(cw) || !isFinite(ch) || !isFinite(w) || !isFinite(h)) {
            return;
        }

        try {
            // fill image in dest. rectangle
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
        } catch (e) {
            console.warn("Canvas drawImage failed:", e);
        }
    };

    // 3. Render the correct frame based on scroll progress
    const renderFrame = (index) => {
        if (!canvasRef.current) return;

        // Safe check for images loaded mapping
        let loadedCount = 0;
        for (let i = 0; i < FRAME_COUNT; i++) {
            if (imagesRef.current[i]) loadedCount++;
        }
        if (loadedCount < FRAME_COUNT) return;

        // Ensure index is within bounds [0, 18]
        const safeIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
        const img = imagesRef.current[safeIndex];

        if (img) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Handle high DPI displays (Retina) for crisp canvas
            const scale = window.devicePixelRatio || 1;

            // Only resize if needed to prevent performance hits
            if (canvas.width !== canvas.offsetWidth * scale || canvas.height !== canvas.offsetHeight * scale) {
                canvas.width = canvas.offsetWidth * scale;
                canvas.height = canvas.offsetHeight * scale;
                ctx.scale(scale, scale);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw image covering the canvas (emulating object-cover object-center)
            drawImageProp(ctx, img, 0, 0, canvas.offsetWidth, canvas.offsetHeight, 0.5, 0.5);
        }
    };

    // Initial draw once all images load
    useEffect(() => {
        if (imagesLoaded === FRAME_COUNT) {
            renderFrame(0);
        }
    }, [imagesLoaded]);

    // Handle Resize (redraw current frame to maintain `object-cover`)
    useEffect(() => {
        const handleResize = () => {
            // We use the scrollYProgress current value to know which frame we are on
            const progress = scrollYProgress.get();
            const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
            renderFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [scrollYProgress]);

    // 4. Update the Canvas whenever scroll progresses
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Find the exact frame index based on progress (latest is 0.0 to 1.0)
        // We use Math.floor to snap to the exact integer frame
        const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));

        // Use requestAnimationFrame to ensure smooth 60fps drawing synced with display
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Parallax scaling effect to match exactly what we had with the static image
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.35]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0]);

    return (
        <motion.div
            className="absolute inset-0 z-[1] w-full h-full pointer-events-none"
            style={{ scale: imageScale, opacity: imageOpacity }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full mix-blend-luminosity"
            />
        </motion.div>
    );
};

export default HeroScrollFrames;
