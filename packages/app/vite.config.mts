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
      // Node 25+ ships a native (file-backed) `localStorage` global that throws
      // unless `--localstorage-file` is set, shadowing the one provided by jsdom.
      // Disable Node's experimental Web Storage so jsdom owns localStorage.
      // https://nodejs.org/api/cli.html#--experimental-webstorage
      execArgv: ["--no-experimental-webstorage"],
      setupFiles: ["./react-testing-library.config.js"],
      silent: true,
      include: ["./src/**/*.{test,spec}.{ts,tsx}"],
    },
  }
})
