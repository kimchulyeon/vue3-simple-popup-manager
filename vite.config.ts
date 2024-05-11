import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "Vue3SimplePopupManager",
      fileName: (format) => `vue-popup-manager.${format}.js`,
    },
    rollupOptions: {
      // 확실한 외부화를 보장
      external: ["vue"],
      output: {
        // Vue와 같은 전역 변수를 사용
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
