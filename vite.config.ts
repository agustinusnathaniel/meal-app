import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react-oxc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import tsConfigPaths from 'vite-tsconfig-paths';

const pwaOptions: Partial<VitePWAOptions> = {
  // TODO: enable if want to enable PWA service worker
  disable: true,
  registerType: 'autoUpdate',
  workbox: {
    cleanupOutdatedCaches: true,
  },
  base: '/',
  manifest: {
    name: 'Meal App',
    short_name: 'meal-app',
    theme_color: '#000000',
    lang: 'en',
    start_url: '/',
    background_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
  },
  pwaAssets: {
    disabled: false,
    config: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ValidateEnv(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
    checker({
      typescript: true,
      biome: true,
    }),
    VitePWA(pwaOptions),
  ],
  server: {
    open: true,
  },
});
