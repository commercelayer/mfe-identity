import type { Settings, InvalidSettings } from 'App'
import type { IdentityProviderState } from './types'

type Action =
  | { type: 'identity/onLoad' }
  | { type: 'identity/onError' }
  | { type: 'settings/loaded'; payload: Settings | InvalidSettings }
  | { type: 'login/onLoad' }
  | { type: 'login/logged'; payload: Settings | InvalidSettings }
  | { type: 'login/onError' }
  | { type: 'signup/onLoad' }
  | { type: 'signup/created' }
  | { type: 'signup/onError' }

export const reducer = (
  state: IdentityProviderState,
  action: Action
): IdentityProviderState | never => {
  switch (action.type) {
    case 'identity/onLoad':
      return {
        ...state,
        isLoading: true,
        isLoginOnError: false
      }
    case 'identity/onError':
      return {
        ...state,
        isLoading: false,
        isOnError: true
      }
    case 'settings/loaded':
      return {
        ...state,
        settings: action.payload,
        isLoading: false
      }
    case 'login/onLoad':
      return {
        ...state,
        isLoginLoading: true,
        isLoginOnError: false
      }
    case 'login/logged':
      return {
        ...state,
        settings: action.payload,
        isLoginLoading: true,
        isLoginOnError: false
      }
    case 'login/onError':
      return {
        ...state,
        isLoginLoading: false,
        isLoginOnError: true
      }
    case 'signup/onLoad':
      return {
        ...state,
        isSignUpLoading: true,
        isSignUpOnError: false
      }
    case 'signup/created':
      return {
        ...state,
        isSignUpLoading: true,
        isSignUpOnError: false
      }
    case 'signup/onError':
      return {
        ...state,
        isSignUpLoading: false,
        isSignUpOnError: true
      }
    default:
      return state
  }
}
