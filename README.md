[![codecov](https://codecov.io/gh/cyc8/repo-collector/branch/master/graph/badge.svg?token=JLvyLvtMYq)](https://codecov.io/gh/cyc8/repo-collector)

# Repo Collector (Chrome Extension)
Install through chrome webstore: [Repo Collector](https://chrome.google.com/webstore/detail/repo-collector/hkkaekdbljlnbedcammdgckgckcnkcol/)

## install manually in chrome/chromium

1. install dependencies: `npm install`
2. create build: `npm run build`
3. drag build folder into the chrome/chromium extensions section ([chrome://extensions/](chrome://extensions/)), Developer Mode must be enabled

## supported repository management platforms:

- GitHub: ✅
- Gitlab: In Progress 🚧
- Bitbucket: In Progress 🚧

## setup

- ReactJS
- React Query
- Material-UI
- CRACO: to create seperate JS file for ContentScripts
  - `craco.config.js` will create the seperate file in `static/js/[filename].js` location
