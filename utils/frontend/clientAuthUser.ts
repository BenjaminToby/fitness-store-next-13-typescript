/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
"use client";

import fetchApi from "./fetchApi";

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Auth user on client side
 * ==============================================================================
 */
export default function clientAuthUser({ setUser }: { setUser: any }) {
    /**
     * Check for user in local storage
     *
     * @description Preventdefault, declare variables
     */
    let localStorageUser = localStorage.getItem("user");

    if (localStorageUser) {
        try {
            setUser(JSON.parse(localStorageUser));
            return;
        } catch (error) {
            setUser({});
            return;
        }
    }

    /**
     * Fetch User from server
     *
     * @description Preventdefault, declare variables
     */
    fetchApi(
        "/api/user/authenticate",
        {
            method: "post",
            body: {},
        },
        true
    )
        .then((res: any) => {
            let finalUser = res.user ? res.user : {};

            setUser(finalUser);
            localStorage.setItem("user", JSON.stringify(finalUser));
            // localStorage.setItem("user", JSON.stringify(res.user));
        })
        .catch((error: Error) => {
            console.log(error);
        });
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
