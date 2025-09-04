import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { cpSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Use relative paths for production
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle: () => {
        const src = path.join(__dirname, 'public/_redirects');
        const dest = path.join(__dirname, 'dist/_redirects');
        try {
          cpSync(src, dest, { recursive: true });
          console.log('Successfully copied _redirects file');
        } catch (err) {
          console.error('Error copying _redirects file:', err);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client/public"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@supabase/supabase-js', '@tanstack/react-query'],
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
});
