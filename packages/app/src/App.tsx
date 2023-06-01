import { GlobalStylesProvider } from '@commercelayer/react-utils'
import { HelmetProvider } from 'react-helmet-async'
import { Router, Route, Switch, Redirect } from 'wouter'

import { appRoutes } from '#data/routes'
import { IdentityProvider } from '#providers/provider'
import { EmbeddedCapabilities } from '#components/EmbeddedCapabilities'
import { PageErrorLayout } from '#components/layouts/PageErrorLayout'
import LoginPage from '#pages/LoginPage'
import SignUpPage from '#pages/SignUpPage'
import { getBasePath } from '#utils/getBasePath'

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <EmbeddedCapabilities.IframeResizerInit />
      <IdentityProvider config={window.clAppConfig}>
        {({ settings }) => (
          <GlobalStylesProvider primaryColor={settings.primaryColor}>
            <Router base={getBasePath()}>
              <Switch>
                <Route path='/'>
                  <Redirect to={`/login${window.location.search ?? ''}`} />
                </Route>
                <Route path={appRoutes.login.path}>
                  <LoginPage />
                </Route>
                <Route path={appRoutes.signUp.path}>
                  <SignUpPage />
                </Route>
                <Route>
                  <PageErrorLayout statusCode={404} message='Page not found' />
                </Route>
              </Switch>
            </Router>
          </GlobalStylesProvider>
        )}
      </IdentityProvider>
    </HelmetProvider>
  )
}

export default App
