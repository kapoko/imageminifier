const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

// Check if argument is given
if (!process.argv || typeof process.argv[2] === 'undefined') {
    throw new Error('No argument specified');
}

let imagePath = process.argv[2];

// Check if file exists at give path
if (!fs.existsSync(imagePath)) {
    throw new Error("File doesn't exist");
}

// Convert image
(async () => {
	const file = await imagemin([imagePath], {
		destination: path.dirname(imagePath),
		plugins: [
			imageminMozjpeg({ quality: 75 }),
			imageminPngquant({ quality: [0.65, 0.9] })
		]
    });
    
    console.log("Optimized " + path.basename(imagePath));
})();