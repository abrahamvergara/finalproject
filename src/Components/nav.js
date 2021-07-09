import React from "react";
import { Link } from "react-router-dom";



import firebase from "../utils/firebase";

export default function nav() {
  const signout = () => {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

return (
    <div class="navigate">
        <h1 class="logo">Meower</h1>
        
        <ul>
           
            <li><Link to="/timeline">TIMELINE</Link></li>
            <li><Link to="/messages">MESSAGES</Link></li>
            <li><Link to="/profile">PROFILE</Link></li>
            <li>
              <button class="sign" onClick={signout}>SIGN OUT</button>
            </li>
           
        </ul>
    </div>
)
}
