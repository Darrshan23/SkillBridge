import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite config — nothing SkillBridge-specific happens here.
export default defineConfig({
  plugins: [react()],
});
