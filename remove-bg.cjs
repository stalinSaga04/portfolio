const Jimp = require('jimp');

Jimp.read('public/logo.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If the pixel is close to white, make it transparent
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });
    return image.write('public/logo.png');
  })
  .then(() => {
    console.log('Logo background removed successfully.');
    // Also copy to favicon if we want
    return Jimp.read('public/logo.png').then(img => img.resize(64, 64).write('public/favicon.png'));
  })
  .catch(err => {
    console.error('Error processing image:', err);
    process.exit(1);
  });
