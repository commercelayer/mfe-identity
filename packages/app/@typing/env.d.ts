/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PROJECT_PATH?: string
  readonly NODE_ENV?: string
  readonly ALLOW_LOCAL_PACKAGES: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
