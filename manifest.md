https://developer.chrome.com/docs/extensions/mv3/manifest/ 
default_popup: declare which file is used for displaying the popup
- permissions: 
  - storage: to save use data
  - activeTab: to have access to current tab
  - scripting: to allow injecting scripts into websites
- action:
  - default_icon: set the icon fot the toolbar
- icons: sets the icon for the extension management page, favicon, and permission warning


## service worker
"service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction."


```js
"background": {
  "service_worker": "background.js"
}
```