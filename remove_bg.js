const Jimp = require('jimp');

async function removeWhiteBackground() {
    console.log('Loading image...');
    const img = await Jimp.read('e:/New folder/portfolio/public/hero_portrait.jpg');
    
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    console.log(`Image size: ${w}x${h}`);
    
    img.scan(0, 0, w, h, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Replace near-white background (very light pixels)
        if (r > 230 && g > 220 && b > 215) {
            // Calculate how "white" this pixel is and scale alpha accordingly
            const whiteness = Math.min(r, g, b);
            // Smooth transition: pixels >240 become fully transparent, 220-240 semi-transparent
            const alpha = Math.max(0, Math.round((240 - whiteness) * 6));
            this.bitmap.data[idx + 3] = Math.min(255, alpha);
        }
    });
    
    const outputPath = 'e:/New folder/portfolio/public/hero_portrait.png';
    await img.writeAsync(outputPath);
    console.log('SUCCESS: Transparent PNG saved to', outputPath);
}

removeWhiteBackground().catch(console.error);
