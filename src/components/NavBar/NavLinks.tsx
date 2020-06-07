import {useAuth0} from "../../auth/react-auth0-spa";
import {client} from "../../dataServices/apollo/client";
import {Link} from "react-router-dom";
import {VisibleIfUserIsSignedIn} from "../Security";
import React from "react";
import {SignInBtn, SignOutBtn} from "./NavBar";

const linkBtnClass = "md:inline-block font-bold block mt-4 mr-6 lg:mt-0 text-teal-200 hover:text-white"


export const NavLinks = () => {
    const {isAuthenticated, isInitializing, loginWithRedirect, logout} = useAuth0()
    const signOutAndClearCache = () => {
        client.resetStore()
        logout({returnTo: window.location.origin})
    }

    if (isInitializing) return <></>

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