import {useAuth0} from "../../auth/react-auth0-spa";
import {client} from "../../dataServices/apollo/client";
import {Link} from "react-router-dom";
import {VisibleIfUserIsSignedIn} from "../Security";
import React from "react";

const linkBtnClass = "md:inline-block font-bold block mt-4 mr-6 lg:mt-0 text-teal-200 hover:text-white"
const authBtnClass = "text-sm p-2 leading-none font-bold border rounded text-teal-200 border-teal-200 hover:border-transparent hover:text-teal-500 hover:bg-white"

export const SignOutBtn = (logout: () => void) =>
  <button
    className={authBtnClass}
    onClick={logout}
  >
    Log out
  </button>

export const SignInBtn = (loginWithRedirect: () => void) =>
  <button
    className={authBtnClass}
    onClick={loginWithRedirect}
  >
    Sign In
  </button>

/**
 * Used to created links for navigation bar.
 */
export const NavLinks = () => {
  const {isAuthenticated, isInitializing, loginWithRedirect, logout} = useAuth0()

  // Function to clear cache and token if sign out button is clicked.
  const signOutAndClearCache = () => {
    client.resetStore()
    logout({returnTo: window.location.origin})
  }

  if (isInitializing) return <></>

  // Variable to display sign in or logout button depending on current auth0 state.
  const authBtn = isAuthenticated ? SignOutBtn(signOutAndClearCache) : SignInBtn(loginWithRedirect)

  return(
    <>
      <div className="text-sm flex-grow">
        <Link to='' href="#responsive-header" className={linkBtnClass}>
          Home
        </Link>
        <VisibleIfUserIsSignedIn>
          <Link to='CreateEvent' href="#responseive-header" className={linkBtnClass}>
            Create New Event
          </Link>
        </VisibleIfUserIsSignedIn>
      </div>
      <div className="float-right">
        {authBtn}
      </div>
    </>
  )
}