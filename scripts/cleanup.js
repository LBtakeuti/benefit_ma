#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Running cleanup script...');

// List of directories and files to check and clean
const cleanupTargets = [
  // Directories
  { type: 'dir', path: path.join(__dirname, '..', '.next') },
  { type: 'dir', path: path.join(__dirname, '..', 'app', 'api', 'news', 'contentful') },
  
  // Files
  { type: 'file', path: path.join(__dirname, '..', 'app', 'lib', 'contentful.ts') },
  { type: 'file', path: path.join(__dirname, '..', 'app', 'lib', 'contentful.js') },
];

// Clean up targets
cleanupTargets.forEach(target => {
  if (target.type === 'dir' && fs.existsSync(target.path)) {
    fs.rmSync(target.path, { recursive: true, force: true });
    console.log(`✅ Removed directory: ${target.path}`);
  } else if (target.type === 'file' && fs.existsSync(target.path)) {
    fs.unlinkSync(target.path);
    console.log(`✅ Removed file: ${target.path}`);
  }
});

console.log('✅ Cleanup completed');