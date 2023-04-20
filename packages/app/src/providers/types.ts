import type { Settings, InvalidSettings } from 'App'

export interface IdentityProviderState {
  settings: Settings | InvalidSettings
  isLoading: boolean
  isOnError: boolean
  isLoginLoading: boolean
  isLoginOnError: boolean
}

export interface IdentityProviderValue {
  state: IdentityProviderState
  customerLogin: ({
    customerEmail,
    customerPassword
  }: LoginFormValues) => Promise<void>
}

export interface LoginFormValues {
  customerEmail: string
  customerPassword: string
}
