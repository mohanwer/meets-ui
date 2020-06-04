import React, { useState, useEffect } from 'react'
import { useAuth0 } from '../auth/react-auth0-spa';
import { Link } from 'react-router-dom';
import { TailwindMedia } from '../tailwind.media.config';
import { client } from '../services/apollo/client';
import {VisibleIfUserIsSignedIn} from './Security'

const authBtnClass = "text-sm p-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
const linkBtnClass = "md:inline-block block mt-4 mr-2 lg:mt-0 text-teal-200 hover:text-white"

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


export const NavBar : React.FC<{}> = (props) => {
  const {isAuthenticated, isInitializing, loginWithRedirect, logout} = useAuth0()
  const [isLinkMenuVisible, setLinkMenuVisibility] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  
  const signOutAndClearCache = () => {
    client.resetStore()
    logout()
  }

  const authBtn = isAuthenticated ? SignOutBtn(signOutAndClearCache) : SignInBtn(loginWithRedirect)

  let links = (
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

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize);
    } 
  })

  if (isInitializing) return <div>...Loading</div>
  
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <span className="font-semibold text-xl italic tracking-tight">
            Assemble Anywhere
          </span>
        </div>
        <>
          {width > TailwindMedia.sm ? (
            <div className="sm:flex-grow sm:flex sm:items-center sm:w-auto">
              {links}
            </div>
          ) : (
            <>
              <div>
                <button 
                  className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                  onClick={() => setLinkMenuVisibility(!isLinkMenuVisible)}
                >
                  <svg 
                    className="fill-current h-3 w-3" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                  </svg>
                </button>
              </div>
              {isLinkMenuVisible && (
                <div className="w-full">
                  {links}
                </div>
              )}
            </>
          )}
        </>
      </nav>
      <div className='flex justify-center bg-gray-100 bg-cover'>
        {props.children}
      </div>
    </>
  )
}