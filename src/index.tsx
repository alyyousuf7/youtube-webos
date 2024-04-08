import 'webostvjs/webOSTV';
import 'webostvjs/webOSTV-dev';

type LaunchParams = {
  target?: string | object;
};

function launchYouTubeTV(params?: LaunchParams) {
  const url = new URL('https://www.youtube.com/tv?env_forceFullAnimation=1#/');
  if (params) {
    // TODO: Handle launch params
    console.info('Launch params:', params);
  }

  window.location.href = url.toString();
}

window.addEventListener('load', () => {
  if (window.webOS.fetchAppId()) {
    console.info('App launched on LG TV');
    launchYouTubeTV(window.webOSDev.launchParams());
    return;
  }

  console.info('App launched on Browser');
  if (!window.navigator.userAgent.includes('LG Browser')) {
    // Using only "LG Browser" does not enable all of the YouTube TV features.
    // For example, YouTube auto-preview video feature does not work with just "LG Browser" as UA string.
    const recommendedUA = 'LG Browser/8.00.00 (webOS.TV-2022), _TV_O18/03.33.80 (LG, 55UQ7590PUB, wireless)';

    document.body.innerText = `Please set User-Agent to "${recommendedUA}" and refresh the page.`;
    return;
  }

  document.body.innerText = 'Redirecting to YouTube TV in 5 seconds...';
  launchYouTubeTV();
});
