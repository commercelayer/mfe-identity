import type { Settings, InvalidSettings } from 'App'

export interface IdentityProviderState {
  settings: Settings | InvalidSettings
  isLoading: boolean
  isOnError: boolean
}

export interface IdentityProviderValue {
  state: IdentityProviderState
}
