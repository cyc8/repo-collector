- use CRACO to have a seperate JavaScript file for the ContentScripts
  - `craco.config.js` will create the seperate file in `static/js/[filename].js` location

- Manifest v3:
  - https://developer.chrome.com/docs/extensions/mv3/manifest/


# Install in Chrome
1. Install Dependencies: `npm install`
2. Create Build: `npm run build`
3. Drag build folder into the chrome/chromium extensions section ([chrome://extensions/](chrome://extensions/)), Developer Mode must be enabled