import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { writeFileSync, cpSync } from "fs";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to ensure _redirects is copied to the output directory
const copyRedirectsPlugin = () => ({
  name: 'copy-redirects',
  closeBundle: () => {
    const src = path.join(__dirname, 'public/_redirects');
    const dest = path.join(__dirname, 'dist/public/_redirects');
    try {
      cpSync(src, dest, { recursive: true });
      console.log('Successfully copied _redirects file');
    } catch (err) {
      console.error('Error copying _redirects file:', err);
    }
  },
});

export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copyRedirectsPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@supabase/supabase-js', '@tanstack/react-query'],
        },
        // Ensure consistent chunk naming for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Copy public directory to dist
    copyPublicDir: true,
  },
});
