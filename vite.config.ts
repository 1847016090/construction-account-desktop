import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

const appDirectory = fs.realpathSync(process.cwd());

/** @name 根据项目路径获取绝对路径 */
const resolveAbsolutePath = (relativePath: string) => {
  return path.resolve(appDirectory, relativePath);
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolveAbsolutePath('./src/'),
      '~': resolveAbsolutePath('./node_modules/'),
    },
    // extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
});
