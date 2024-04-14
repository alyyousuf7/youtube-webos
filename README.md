# Enhanced YouTube for webOS

> [!WARNING]
> This is currently a half-cooked project. It is expected that things will break or not work as expected, as it's been tested only on a very few TVs.
>
> If you're looking for a more stable version, head to https://github.com/webosbrew/youtube-webos.

<img width="1347" alt="image" src="https://github.com/alyyousuf7/youtube-webos/assets/14050128/ff8d5334-cc9e-4b03-9711-78ca09122329">
<img width="1302" alt="image" src="https://github.com/alyyousuf7/youtube-webos/assets/14050128/dad6b1ae-f850-4853-99aa-96bd581b0306">


## Features
- Ability to block YouTube Ads (see Known Issues)
  - Blocks in-video ads by YouTube
  - Removes YouTube Ad while exploring videos
- Ability to remove YouTube Shorts (see Known Issues)
- SponsorBlock segment skipping
  - Ability to control which segments to load
  - Ability to skip segments automatically or manually
    - Automatically: Shows a message when a segment is skipped
    - Manually: Allows to skip manually using the RED button
    - Use RED button to quickly switch between the two modes
  - Prefers loading SponsorBlock segments privately, but fallback to loading them publicly on failure
  - Indicates on video progress bar when segments are loading

### Known Issues
- Ads and Shorts are not blocked/removed on first page load

### Upcoming features
- Handle Launch Parameters (I'm not really sure what features it opens up)

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
