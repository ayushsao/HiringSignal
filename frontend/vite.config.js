// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
  
//   return {
//     plugins: [react()],
//     server: {
//       port: 5173,
//       proxy: {
//         "/api": {
//           target: env.VITE_API_URL || "https://hiringsignal.onrender.com/api",
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       },
//     },
//     build: {
//       sourcemap: false,
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             vendor: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"],
//           },
//         },
//       },
//     },
//   };
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://hiringsignal.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "three",
            "@react-three/fiber",
            "@react-three/drei",
          ],
        },
      },
    },
  },
});
