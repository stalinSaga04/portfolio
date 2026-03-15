import Jimp from 'jimp';
import { fileURLToPath } from 'url';
import path from 'path';

async function removeWhiteBackground() {
    console.log('Loading image...');
    const inputPath = 'e:/New folder/portfolio/public/hero_portrait.jpg';
    const outputPath = 'e:/New folder/portfolio/public/hero_portrait.png';
    
    const img = await Jimp.read(inputPath);
    
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    console.log(`Image size: ${w}x${h}`);
    
    img.scan(0, 0, w, h, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Detect light background pixels (near-white)
        if (r > 225 && g > 215 && b > 205) {
            const whiteness = Math.min(r, g, b);
            // Ramp from semi-transparent to fully transparent as whiteness increases
            const alpha = Math.max(0, Math.round((245 - whiteness) * 8));
            this.bitmap.data[idx + 3] = Math.min(255, alpha);
        }
    });
    
    await img.writeAsync(outputPath);
    console.log('SUCCESS: Transparent PNG created at', outputPath);
}

removeWhiteBackground().catch(console.error);
