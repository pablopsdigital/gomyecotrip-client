// import react from '@vitejs/plugin-react-swc';
// import {defineConfig} from 'vitest/config';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// });

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build'
    },
    plugins: [react()]
  };
});
