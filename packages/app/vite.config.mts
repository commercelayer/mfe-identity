import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const basePath =
    env.PUBLIC_PROJECT_PATH != null ? `/${env.PUBLIC_PROJECT_PATH}` : ""

  return {
    plugins: [react(), tsconfigPaths()],
    envPrefix: "PUBLIC_",
    base: `${basePath}/`,
    build: {
      target: "esnext",
    },
    server: {
      fs: {
        strict: env.ALLOW_LOCAL_PACKAGES === "true",
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./react-testing-library.config.js"],
      silent: true,
    },
  }
})
