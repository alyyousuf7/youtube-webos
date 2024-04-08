# Enhanced YouTube for webOS

> [!WARNING]
> This is currently a half-cooked project. It is expected that things will break or not work as expected.

<img width="1176" alt="image" src="https://github.com/alyyousuf7/youtube-webos/assets/14050128/921da4f8-7345-449d-91d6-641f042fee04">

## Features
- Ability to block YouTube Ads
  - Blocks in-video ads by YouTube
- SponsorBlock segment skipping
  - Ability to control which segments to load
  - Ability to skip segments automatically or manually
    - Automatically: Shows a message when a segment is skipped
    - Manually: Shows a skip button (better UI is in progress)
    - Use RED button to quickly switch between the two modes
  - Prefers loading SponsorBlock segments privately, but fallback to loading them publicly on failure
  - Indicates on video progress bar when segments are loading

### Upcoming features
- Handle Launch Parameters (I'm not really sure what features it opens up)
- Block sponsored/ad tiles on other pages

# Build and Install
```sh
$ yarn
$ yarn build # or yarn start
$ yarn build-ipk && yarn install-ipk && yarn launch-ipk
```
The last command requires you to have [webOS CLI](https://webostv.developer.lge.com/develop/tools/cli-installation) installed and have your TV added to the CLI.

# Development Environment / Contributing
- Read [DEV_ENV.md](./DEV_ENV.md) for setting up the development environment
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) if you consider contributing to the project :heartpulse:

# To do
- [ ] Handle Launch Parameters
- [ ] SponsorBlock
  - [ ] Show segments with correct height for videos with chapters
- [ ] AdBlock
  - [ ] Block sponsored tiles
- [ ] Other
  - [ ] Add CI to release
  - [ ] Add CI for PRs to ensure linting
  - [ ] Add pre-commit hooks to ensure linting

# Why?
To be honest, I really loved the work done by developers for https://github.com/webosbrew/youtube-webos.

This is purely a fun, side project. At work, we've been using some legacy tools - I wanted a real side project where I could experiment with new tools. This project gives me an opportunity to do just that!

# Credits
All inspiration came from https://github.com/webosbrew/youtube-webos :bow:

If this project goes well, I'll ask their maintainers to merge it one day :smile: _although I think the chances are slim._
