import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
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
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
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
    open: true
  }
});
