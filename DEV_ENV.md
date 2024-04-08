# Development Environment
You can either build the app and run on your TV, or start the development server and test it on your computer on a browser.

For unknown reason, webOS Simulator is not working for me.

## Run locally on your computer
To run this app on a web browser on a computer, there are three steps:
1. Start development server
2. Inject UserScript to https://www.youtube.com/tv
3. Open https://localhost:5001 and override your browser's User Agent to mock a TV browser

For any change, refresh the YouTube TV tab.

### Start development server
Install dependencies and start the server
```sh
$ yarn
$ yarn start
```

This will start serving the user script on port `5001`, needed for next step.

### Inject UserScript
Again, there are multiple ways to inject custom scripts to a website - [TamperMonkey](https://www.tampermonkey.net/) works fine.

- Install TamperMonkey extension on Chrome
- Create a new User Script with the following content:
```js
// ==UserScript==
// @name         webOS YouTubeTV Development User Script
// @version      0.1
// @description  Load webOS UserScript on YouTube TV
// @author       Ali Yousuf
// @include      *youtube.com/tv*
// @icon         https://www.youtube.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:5001/webOSUserScripts/userScript.js';
    document.head.appendChild(script);
})();
```

### Open http://localhost:5001 and override User Agent
Open http://localhost:5001, and it will notify you that you do not have the expected User Agent.

We need to change the User Agent because https://youtube.com/tv redirects non-TV User Agents to regular YouTube.

There are many ways to override your browser's User Agent.

I prefer [Chrome's Network Conditions method](https://developer.chrome.com/docs/devtools/device-mode/override-user-agent), as it requires no external extensions.

I recommend to set the User Agent to `LG Browser/8.00.00 (webOS.TV-2022), _TV_O18/03.33.80 (LG, 55UQ7590PUB, wireless)`.

> [!NOTE]
> I noticed that you can also set it just to `LG Browser`, but YouTube TV doesn't seem to enable auto-preview feature for videos on home page.

Once done, keep the DevTools opened and refresh the tab.

# Contribute
[Read more here](./CONTRIBUTING.md).
