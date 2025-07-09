#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up any remaining Contentful references...');

// Remove contentful from package.json if it exists
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Remove contentful from dependencies
  if (packageJson.dependencies && packageJson.dependencies.contentful) {
    delete packageJson.dependencies.contentful;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Removed contentful from package.json');
  }
}

// Ensure no contentful files exist
const contentfulApiPath = path.join(__dirname, '..', 'app', 'api', 'news', 'contentful');
if (fs.existsSync(contentfulApiPath)) {
  fs.rmSync(contentfulApiPath, { recursive: true, force: true });
  console.log('✅ Removed contentful API directory');
}

const contentfulLibPath = path.join(__dirname, '..', 'app', 'lib', 'contentful.ts');
if (fs.existsSync(contentfulLibPath)) {
  fs.unlinkSync(contentfulLibPath);
  console.log('✅ Removed contentful lib file');
}

console.log('✅ Pre-build cleanup completed');