import { createContext, useContext, useEffect, useReducer } from 'react'

import { PageErrorLayout } from '#components/layouts/PageErrorLayout'

import type { ChildrenElement } from 'App'
import type {
  IdentityProviderState,
  IdentityProviderValue
} from '#providers/types'

import { reducer } from '#providers/reducer'

import { getClientIdFromUrl, getScopeFromUrl } from '#utils/getParamsFromUrl'
import { defaultSettings, getSettings } from '#utils/getSettings'

interface IdentityProviderProps {
  /**
   * If needed, context value can be also accessed using a function as a child.
   *
   * Example:
   * ```
   * <IdentityProvider config={config}>
   *  {(ctx) => <div>identity</div>}
   * </IdentityProvider>
   * ```
   */
  children:
    | ((props: IdentityProviderValue) => ChildrenElement)
    | ChildrenElement
  config: CommerceLayerAppConfig
}

export const initialState: IdentityProviderState = {
  settings: defaultSettings,
  isLoading: true,
  isOnError: false
}

export const initialValues: IdentityProviderValue = {
  state: initialState
}

const IdentityContext = createContext<IdentityProviderValue>(initialValues)
export const useIdentityContext = (): IdentityProviderValue =>
  useContext(IdentityContext)

export function IdentityProvider({
  config,
  children
}: IdentityProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clientId = getClientIdFromUrl()
  const scope = getScopeFromUrl()

  if (clientId == null || scope == null) {
    return (
      <PageErrorLayout statusCode={500} message='Missing required parameter.' />
    )
  }

  useEffect(() => {
    dispatch({ type: 'identity/onLoad' })

    if (clientId != null && scope != null) {
      getSettings({ clientId, scope, config })
        .then((settings) => {
          dispatch({ type: 'identity/loaded', payload: settings })
        })
        .catch(() => dispatch({ type: 'identity/onError' }))
    }
  }, [clientId, scope])

  const value: IdentityProviderValue = { state }
  return (
    <IdentityContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </IdentityContext.Provider>
  )
}
