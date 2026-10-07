import { Config } from "@remotion/cli/config";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const findCachedBrowser = () => {
  if (process.env.REMOTION_BROWSER_EXECUTABLE) {
    return process.env.REMOTION_BROWSER_EXECUTABLE;
  }

  const cacheDirectory = path.join(os.homedir(), ".cache", "ms-playwright");

  try {
    const candidates = fs
      .readdirSync(cacheDirectory)
      .filter((entry) => entry.startsWith("chromium_headless_shell-"))
      .sort()
      .reverse()
      .map((entry) =>
        path.join(
          cacheDirectory,
          entry,
          "chrome-headless-shell-linux64",
          "chrome-headless-shell",
        ),
      )
      .filter((candidate) => fs.existsSync(candidate));

    return candidates[0] ?? null;
  } catch {
    return null;
  }
};

// Keep the production system isolated while reading the website's public assets.
Config.setPublicDir("../public");
Config.setOverwriteOutput(true);

const browserExecutable = findCachedBrowser();
if (browserExecutable) {
  Config.setBrowserExecutable(browserExecutable);
}
