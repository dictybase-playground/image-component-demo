/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vite"
import { defineConfig as defineTestConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
})

const vitestConfig = defineTestConfig({
  test: {
    environment: "jsdom",
  },
})

export default mergeConfig(viteConfig, vitestConfig)
