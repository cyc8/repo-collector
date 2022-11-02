# install in chrome / chromium

1. Install Dependencies: `npm install`
2. Create Build: `npm run build`
3. Drag build folder into the chrome/chromium extensions section ([chrome://extensions/](chrome://extensions/)), Developer Mode must be enabled

# Support repository management platforms:

- GitHub: ✅
- Gitlab: In Progress 🚧
- Bitbucket: In Progress 🚧

# architecture

- ReactJS with CRA
- React Query: GitHub API requests
- use CRACO to have a seperate JavaScript file for the ContentScripts
  - `craco.config.js` will create the seperate file in `static/js/[filename].js` location

# Chrome Documentation

- Manifest v3:
  - https://developer.chrome.com/docs/extensions/mv3/manifest/
- Permissions:
  - https://developer.chrome.com/docs/extensions/mv3/declare_permissions/
