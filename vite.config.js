import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ValidateEnv(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
