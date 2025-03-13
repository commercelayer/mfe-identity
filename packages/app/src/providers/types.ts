import type { Settings } from "App"

export interface IdentityProviderState {
  settings: Settings
  isLoading: boolean
}

export interface IdentityProviderValue {
  settings: Settings
  config: CommerceLayerAppConfig
}
