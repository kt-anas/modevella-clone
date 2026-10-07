# Modevelle Video Production

An isolated Remotion project for rendering Modevelle advertisements to MP4.
It reads the website assets from the root `public/` directory and does not
mount, record, or change the website.

## Install

```bash
pnpm install
pnpm exec remotion browser ensure
```

If the automatic browser download is unavailable, set
`REMOTION_BROWSER_EXECUTABLE` to a local Chromium or Chrome executable before
rendering. The config also detects a Playwright headless-shell cache when one
is already installed.

## Render

```bash
pnpm run render
pnpm run render:story
```

Outputs are written to `out/`:

- `modevelle-ad.mp4` is a 15-second 1080x1350 feed ad.
- `modevelle-story-ad.mp4` is a 15-second 1080x1920 story ad.

## Preview

```bash
pnpm run studio
```

The composition is built from local `Img` and `Video` layers. It does not use
screen capture, browser recording, website navigation, or an iframe.
