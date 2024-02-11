# Encrypted Thread Challenge for Algorithm Arena

Browser-encrypted thread that can be shared through the url. Submission for the fourth weekly challenge on [Algorithm Arena](https://github.com/Algorithm-Arena/weekly-challenge-4-encrypted-thread). The project uses **Bun**, **React**, **TypeScript**, **Rsbuild** and **Biome**.

Demo: [Video Download](https://github.com/tobua/encrypted-thread-challenge/raw/main/video.mov) or [𝕏 Post](https://twitter.com/matthiasgiger/status/1756808521977401378).

## Description

The user can add one of more replies to the initial thread. By pressing the share button then can add their name and pick an optional password. Using the password and the Browser `crypto` API the replies with be encrypted and added to the URL. The URL can now be shared with somebody else without any middlemen being able to read the message without also having access to the password. The end user can then enter the password to decode the contents from the URL hash resulting in the full thread being displayed. Once a password is entered it's also stored in `sessionStorage` to persist during page reloads.

## Installation

```sh
bun install
bun start # Start and open the application in the browser.
bun format # Format files with Biome.
bun lint # Lint files with Biome.
bun run build & bun preview # Production preview.
```
