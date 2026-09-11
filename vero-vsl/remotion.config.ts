import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setEntryPoint('src/index.ts');
Config.setChromiumOpenGlRenderer('angle');

// Optional: point at a local Chrome/Chromium if Remotion cannot download one.
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
