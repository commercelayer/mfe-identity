import { GlobalStylesProvider } from "@commercelayer/react-utils"
import { HelmetProvider } from "react-helmet-async"
import { Redirect, Route, Router, Switch } from "wouter"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageErrorLayout } from "#components/layouts/PageErrorLayout"
import { appRoutes } from "#data/routes"
import LoginPage from "#pages/LoginPage"
import SignUpPage from "#pages/SignUpPage"
import { IdentityProvider } from "#providers/provider"

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <HelmetProvider>
      <EmbeddedCapabilities.IframeResizerInit />
      <IdentityProvider config={window.clAppConfig}>
        {({ settings }) => (
          <GlobalStylesProvider primaryColor={settings.primaryColor}>
            <Router base={basePath}>
              <Switch>
                <Route path="/">
                  <Redirect to={`/login${window.location.search ?? ""}`} />
                </Route>
                <Route path={appRoutes.login.path}>
                  <LoginPage />
                </Route>
                <Route path={appRoutes.signUp.path}>
                  <SignUpPage />
                </Route>
                <Route>
                  <PageErrorLayout statusCode={404} message="Page not found" />
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
