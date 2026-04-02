const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let orig = content;

  // Colors
  content = content.replace(/#eccc74/g, 'var(--brand-gold)'); // Will fix tailwind classes below
  content = content.replace(/#f59268/g, 'var(--brand-orange)');
  content = content.replace(/#133240/g, 'var(--brand-dark)');

  // Fix tailwind specific stuff that we broke with var()
  content = content.replace(/from-\[var\(--brand-gold\)\\]/g, 'from-brand-gold');
  content = content.replace(/to-\[var\(--brand-orange\)\\]/g, 'to-brand-orange');
  content = content.replace(/bg-\[var\(--brand-dark\)\\]/g, 'bg-brand-dark');
  content = content.replace(/bg-\[var\(--brand-gold\)\\]/g, 'bg-brand-gold');
  content = content.replace(/text-\[var\(--brand-dark\)\\]/g, 'text-brand-dark');
  content = content.replace(/text-\[var\(--brand-gold\)\\]/g, 'text-brand-gold');
  content = content.replace(/border-\[var\(--brand-dark\)\\]/g, 'border-brand-dark');
  content = content.replace(/border-\[var\(--brand-gold\)\\]/g, 'border-brand-gold');
  content = content.replace(/ring-\[var\(--brand-gold\)\\]/g, 'ring-brand-gold');
  
  // Custom Gradients
  content = content.replace(/bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent/g, 'gradient-brand-text');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-orange/g, 'gradient-brand-text');
  content = content.replace(/bg-gradient-to-r from-brand-gold to-brand-orange/g, 'gradient-brand');

  // RGBA
  content = content.replace(/rgba\(\s*236\s*,\s*204\s*,\s*116\s*,/g, 'rgba(var(--brand-gold-rgb),');
  content = content.replace(/rgba\(\s*245\s*,\s*146\s*,\s*104\s*,/g, 'rgba(var(--brand-orange-rgb),');

  if (orig !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

walkDir('./src/app', processFile);
