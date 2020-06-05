import React, { useEffect } from 'react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import {Redirect, Route, Switch} from 'react-router'
import {configureStore} from "./store/store"
import {ViewEvent, CreateEvent, EditEvent, Home} from './components'
import { Auth0Provider } from './auth/react-auth0-spa';
import {ProtectedRoute} from './components/Security'
import { RedirectLoginResult } from '@auth0/auth0-spa-js'
import { NavBar } from './components/General/NavBar'
import './styles/index.css'
import './App.css'

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE
const auth0RedirectUri = window.location.origin

if (
  auth0Domain === undefined
  || auth0ClientId === undefined
  || auth0Audience === undefined
) throw new Error('missing env vars')

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
  
  // Load google api script when the application is first loaded.
  // This is important for form auto completion.
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_URL}&libraries=places`
    script.async = true
    document.body.append(script)
  })

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
                <Route component={ViewEvent} path={'/Event'}/>
                <ProtectedRoute component={CreateEvent} path={'/CreateEvent'} />
                <ProtectedRoute component={EditEvent} path={'/EditEvent'} />
                <Redirect from='Home' to='/' />
                <Route component={Home} path={'/'}/>
              </Switch>
            </NavBar>
          </Auth0Provider>
        </ConnectedRouter>
      </Provider>
  );
}

export default App
