import type { Settings, InvalidSettings } from 'App'

export interface IdentityProviderState {
  settings: Settings | InvalidSettings
  isLoading: boolean
  isOnError: boolean
  isLoginLoading: boolean
  isLoginOnError: boolean
  isSignUpLoading: boolean
  isSignUpOnError: boolean
}

export interface IdentityProviderValue {
  state: IdentityProviderState
  customerLogin: ({
    customerEmail,
    customerPassword
  }: LoginFormValues) => Promise<void>
  customerSignUp: ({
    customerEmail,
    customerPassword,
    customerConfirmPassword
  }: SignUpFormValues) => Promise<void>
}

export interface LoginFormValues {
  customerEmail: string
  customerPassword: string
}

export interface SignUpFormValues {
  customerEmail: string
  customerPassword: string
  customerConfirmPassword: string
}
