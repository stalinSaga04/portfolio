import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 19;

/**
 * High-performance sequential image rendering on an HTML5 Canvas,
 * pinned to scroll progress. Achieves perfectly smooth scrubbing
 * without the lag of swapping <img src="..." /> paths.
 */
const HeroScrollFrames = ({ scrollYProgress }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // 1. Preload all 19 frame images into memory from public/hero_frames
    useEffect(() => {
        const loadImages = () => {
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const paddedIndex = i.toString().padStart(3, '0');
                const img = new Image();
                img.src = `/hero_frames/ezgif-frame-${paddedIndex}.jpg`;

                img.onload = () => {
                    imagesRef.current[i - 1] = img;
                    setImagesLoaded((prev) => prev + 1);
                };
                img.onerror = () => {
                    console.warn(`Failed to load frame ${paddedIndex}`);
                };
            }
        };

        loadImages();
    }, []);

    // 2. Custom Draw Function to emulate CSS `object-cover`
    const drawImageCover = (ctx, img, canvasW, canvasH) => {
        if (!img || !img.width || !img.height || !canvasW || !canvasH) return;

        const iw = img.width;
        const ih = img.height;
        const scale = Math.max(canvasW / iw, canvasH / ih);
        const nw = iw * scale;
        const nh = ih * scale;
        const ox = (canvasW - nw) / 2;
        const oy = (canvasH - nh) / 2;

        try {
            ctx.drawImage(img, 0, 0, iw, ih, ox, oy, nw, nh);
        } catch (e) {
            console.warn("Canvas drawImage failed:", e);
        }
    };

    // 3. Render the correct frame based on scroll progress
    const renderFrame = (index) => {
        if (!canvasRef.current) return;

        // Check all images are loaded
        let loadedCount = 0;
        for (let i = 0; i < FRAME_COUNT; i++) {
            if (imagesRef.current[i]) loadedCount++;
        }
        if (loadedCount < FRAME_COUNT) return;

        const safeIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
        const img = imagesRef.current[safeIndex];

        if (img) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            if (w === 0 || h === 0) return;

            if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, w, h);
            drawImageCover(ctx, img, w, h);
        }
    };

    // Initial draw once all images load
    useEffect(() => {
        if (imagesLoaded === FRAME_COUNT) {
            renderFrame(0);
        }
    }, [imagesLoaded]);

    // Handle window Resize
    useEffect(() => {
        const handleResize = () => {
            const progress = scrollYProgress.get();
            const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));
            renderFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [scrollYProgress]);

    // 4. Update the Canvas whenever scroll progresses
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Parallax scaling and fade effects
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
