import React, { useState, useEffect } from 'react'
import { TailwindMedia } from '../../tailwind.media.config';
import { NavLinks } from './NavLinks'

/**
 * Navigation bar for site. Has links for creating new event and login/logout pages.
 * @param children - children components to wrap into nav.
 */
export const NavBar : React.FC = ({children}) => {
  const [isLinkMenuVisible, setLinkMenuVisibility] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  // Resizes navigation bar based on screen width.
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-900 inner-spacing">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <span className="font-semibold text-xl italic tracking-tight">
            Assemble Anywhere
          </span>
        </div>
        <>
          {width > TailwindMedia.sm ? (
            <div className="sm:flex-grow sm:flex sm:items-center sm:w-auto">
              <NavLinks/>
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
                  <NavLinks/>
                </div>
              )}
            </>
          )}
        </>
      </nav>
      <div className='flex justify-center bg-gray-100 bg-cover'>
        {children}
      </div>
    </>
  )
}