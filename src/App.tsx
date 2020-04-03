import React from 'react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import {Route, Switch} from "react-router"
import './App.css'
import {configureStore} from "./store/store"
import {Home} from './Home'
import {General} from "./General"
import {Auth0Provider} from './auth/react-auth0-spa'
import {ProtectedRoute} from './auth/ProtectedRoute'
import { RedirectLoginResult } from '@auth0/auth0-spa-js'
import { NavBar } from './components/NavBar'
import './styles/index.css'

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE
const auth0RedirectUri = window.location.origin

if (
  auth0Domain === undefined
  || auth0ClientId === undefined
  || auth0Audience === undefined
) {
  throw new Error('missing env vars')
}

const history = createBrowserHistory();
const store = configureStore(history, {});

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
  // Clears auth0 query string parameters from url
  const targetUrl = redirectResult
  && redirectResult.appState
  && redirectResult.appState.targetUrl
    ? redirectResult.appState.targetUrl
    : window.location.pathname

  history.push(targetUrl)
}

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Auth0Provider
            domain={auth0Domain}
            client_id={auth0ClientId}
            redirect_uri={auth0RedirectUri}
            audience={auth0Audience}
            onRedirectCallback={onAuthRedirectCallback}
          >
            <NavBar>
              <Switch>
                <Route component={Home} path={'/Home'}/>
                <ProtectedRoute component={General} path={'/General'}/>
              </Switch>
            </NavBar>
          </Auth0Provider>
        </ConnectedRouter>
      </Provider>
  );
}

export default App
