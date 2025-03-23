const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { JSDOM } = require('jsdom');
const { SVGPathData } = require('svg-pathdata');

// SVG to PNG conversion script
console.log('Starting SVG to PNG conversion...');

// Read the SVG file
const svgContent = fs.readFileSync(path.join(__dirname, 'logo.svg'), 'utf8');

// Create a new canvas
const width = 500;
const height = 500;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Set the background color
ctx.fillStyle = '#080810';
ctx.fillRect(0, 0, width, height);

// Parse the SVG
const dom = new JSDOM(svgContent, { contentType: 'image/svg+xml' });
const svg = dom.window.document.querySelector('svg');

// Helper function to create a gradient
const createGradient = (x1, y1, x2, y2, stops) => {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  stops.forEach(stop => {
    gradient.addColorStop(stop.offset, stop.color);
  });
  return gradient;
};

// Draw the N-shaped logo
ctx.save();
ctx.translate(250, 250); // Center of the canvas

// Create premium gradient
const premiumGradient = createGradient(0, 0, 100, 100, [
  { offset: 0, color: '#4338CA' },
  { offset: 1, color: '#3B82F6' }
]);

// Draw the N shape
ctx.beginPath();
ctx.moveTo(-60, -60);
ctx.lineTo(-20, -60);
ctx.lineTo(-20, 0);
ctx.lineTo(20, -60);
ctx.lineTo(60, -60);
ctx.lineTo(60, 60);
ctx.lineTo(20, 60);
ctx.lineTo(20, 0);
ctx.lineTo(-20, 60);
ctx.lineTo(-60, 60);
ctx.closePath();
ctx.fillStyle = premiumGradient;
ctx.fill();

// Draw the 3D side effect
ctx.beginPath();
ctx.moveTo(-60, 60);
ctx.lineTo(-60, 70);
ctx.lineTo(20, 70);
ctx.lineTo(20, 60);
ctx.closePath();
ctx.fillStyle = '#2D3A8C';
ctx.fill();

ctx.beginPath();
ctx.moveTo(60, 60);
ctx.lineTo(60, 70);
ctx.lineTo(20, 70);
ctx.lineTo(20, 60);
ctx.closePath();
ctx.fillStyle = '#1E3A8A';
ctx.fill();

// Elegant highlight
ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
ctx.lineWidth = 1.5;

ctx.beginPath();
ctx.moveTo(-60, -60);
ctx.lineTo(-20, -60);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(-20, -60);
ctx.lineTo(-20, 0);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(-20, 0);
ctx.lineTo(20, -60);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(20, -60);
ctx.lineTo(60, -60);
ctx.stroke();

// Draw the subtle reflection
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.globalAlpha = 0.2;
ctx.fillRect(-60, -60, 120, 120);
ctx.globalAlpha = 1;

// Draw the circle
ctx.strokeStyle = 'rgba(67, 56, 202, 0.3)';
ctx.lineWidth = 0.5;
ctx.beginPath();
ctx.arc(0, 0, 150, 0, Math.PI * 2);
ctx.stroke();

ctx.restore();

// Write the PNG file
const out = fs.createWriteStream(path.join(__dirname, 'logo.png'));
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => {
  console.log('PNG file created successfully at logo.png');
}); 