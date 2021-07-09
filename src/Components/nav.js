import React from "react";
import { Link } from "react-router-dom";

import pusa3 from '../pic/pusa3.png'


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
      <img src={pusa3} className="pusa3" alt="logo" />

      <h1 class="meowerword">Meower</h1>
        
        <ul>
            <li><Link to="/timeline"><i class="fa fa-home"></i>HOME</Link></li>
            <li><Link to="/messages"><i class="fa fa-envelope"></i>MESSAGES</Link></li>
            <li><Link to="/profile"><i class="fa fa-user" aria-hidden="true"></i>PROFILE</Link></li>
            <li>
              <button class="sign" onClick={signout}><i class="fa fa-sign-out" aria-hidden="true"></i>SIGN OUT</button>
            </li>
           
        </ul>
    </div>
)
}
