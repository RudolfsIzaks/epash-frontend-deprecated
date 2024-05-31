import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Path to your SSL files
const keyPath = './localhost+2-key.pem';
const certPath = './localhost+2.pem';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    },
    host: '0.0.0.0', // Allows access from external devices
    port: 5174 // Default is 3000, change it if you need to
  }
});
