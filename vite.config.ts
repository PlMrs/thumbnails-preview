import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/Content.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'style.css'
      },
    },
  },
});