import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': 'src/',
      '~': './node_modules/',
    },
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
});
