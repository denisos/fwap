// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {"chrome": "80", node: 'current'}}],
    '@babel/preset-typescript', 
  ],  
};