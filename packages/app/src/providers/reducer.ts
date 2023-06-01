import type { Settings } from 'App'
import type { IdentityProviderState } from './types'

type Action =
  | { type: 'identity/onLoad' }
  | { type: 'identity/onError' }
  | { type: 'identity/loaded'; payload: Settings }

export const reducer = (
  state: IdentityProviderState,
  action: Action
): IdentityProviderState | never => {
  switch (action.type) {
    case 'identity/onLoad':
      return {
        ...state,
        isLoading: true
      }
    case 'identity/onError':
      return {
        ...state,
        isLoading: false
      }
    case 'identity/loaded':
      return {
        ...state,
        settings: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
