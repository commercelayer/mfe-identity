import { createContext, useContext, useEffect, useReducer } from 'react'
import { useLocation } from 'wouter'

import { PageErrorLayout } from '#components/layouts/PageErrorLayout'

import type { ChildrenElement } from 'App'
import type {
  IdentityProviderState,
  IdentityProviderValue,
  LoginFormValues,
  SignUpFormValues
} from '#providers/types'

import { appRoutes } from '#data/routes'
import { reducer } from '#providers/reducer'

import {
  getClientIdFromUrl,
  getScopeFromUrl,
  getReturnUrlFromUrl
} from '#utils/getParamsFromUrl'
import { defaultSettings, getSettings } from '#utils/getSettings'
import { isEmbedded } from '#utils/isEmbedded'
import { createCustomer } from '#utils/createCustomer'
import { getBasePath } from '#utils/getBasePath'
import { getCustomerToken } from '#utils/oauthRequests'

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
  isOnError: false,
  isLoginLoading: false,
  isLoginOnError: false,
  isSignUpLoading: false,
  isSignUpOnError: false
}

export const initialValues: IdentityProviderValue = {
  state: initialState,
  customerLogin: async () => {},
  customerSignUp: async () => {}
}

const IdentityContext = createContext<IdentityProviderValue>(initialValues)
export const useIdentityContext = (): IdentityProviderValue =>
  useContext(IdentityContext)

export function IdentityProvider({
  config,
  children
}: IdentityProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [, setLocation] = useLocation()

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
          dispatch({ type: 'settings/loaded', payload: settings })
        })
        .catch(() => dispatch({ type: 'identity/onError' }))
    }
  }, [clientId, scope])

  const customerLogin = async ({
    customerEmail,
    customerPassword
  }: LoginFormValues): Promise<void> => {
    dispatch({ type: 'login/onLoad' })
    const customerTokenResponse = await Promise.resolve(
      getCustomerToken({
        clientId,
        endpoint: state.settings.endpoint,
        scope,
        username: customerEmail,
        password: customerPassword
      })
    )
    if (customerTokenResponse.access_token != null) {
      dispatch({
        type: 'login/logged',
        payload: {
          ...state.settings,
          customerAccessToken: customerTokenResponse.access_token
        }
      })

      const returnUrl = getReturnUrlFromUrl()
      if (returnUrl != null && window !== undefined) {
        const topWindow = isEmbedded() ? window.parent : window
        const customerAccessTokenUrlParam = `accessToken=${customerTokenResponse.access_token}`
        const customerScopeUrlParam = `&scope=${scope}`
        topWindow.location.href = `${returnUrl}?${customerAccessTokenUrlParam}${customerScopeUrlParam}`
      } else {
        // TODO: Window not defined. Should we console.log something to be shown in tests?
      }
    } else {
      dispatch({ type: 'login/onError' })
    }
  }

  const customerSignUp = async ({
    customerEmail,
    customerPassword
  }: SignUpFormValues): Promise<void> => {
    dispatch({ type: 'signup/onLoad' })

    const customerSignUpResponse = await Promise.resolve(
      createCustomer({
        config,
        accessToken: state.settings.accessToken,
        customerEmail,
        customerPassword
      })
    )

    if (customerSignUpResponse?.object?.id != null) {
      dispatch({
        type: 'signup/created'
      })

      localStorage.setItem('cLayer-identity-signUpStatus', 'success')

      const urlSearchParams = new URLSearchParams(window?.location.search ?? '')
      urlSearchParams.set('customerEmail', customerEmail)
      const routerBasePath = getBasePath() ?? ''

      setLocation(
        `${routerBasePath}${appRoutes.login.makePath()}?${urlSearchParams.toString()}`
      )
    } else {
      dispatch({ type: 'signup/onError' })
    }
  }

  const value: IdentityProviderValue = { state, customerLogin, customerSignUp }
  return (
    <IdentityContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </IdentityContext.Provider>
  )
}
