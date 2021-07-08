import React, { useEffect, useState } from 'react'
import Nav from "../Components/nav"
import dp from "../pic/profile.png"

import firebase from "../utils/firebase";

export default function Profile() {

    const [state, setState] = useState({
        user: null
    })

    useEffect(() => {
        var signedUser = firebase.auth().currentUser;

        if (signedUser) {
            // User is signed in.
            setState({ user: signedUser })
        } else {
            // No user is signed in.
            setState(null)
        }
    }, [])

    return (
        <div className="profilebg">
            <Nav />
            <div className="dps">
                <img src={dp} alt="Logo" />
            </div>
            <h1 class="welcome">{state.user ? state.user.email : "null"}</h1>
            <p class="tag">Email : {state.user ? state.user.email : "null"}</p>



        </div>
    )
}
