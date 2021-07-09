import "./App.css";
import "./Css/login.css"
import "./Css/nav.css"
import "./Css/messages.css"
import "./Css/home.css"
import "./Css/events.css"
import "./Css/timeline.css"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import React, { useState, useEffect } from "react"

/*material-ui*/
import { ThemeProvider } from "@material-ui/core";
import theme from "./utils/theme";

/**Pages */

import Profile from "./pages/Profile";
import NotFound from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/Register";
import Timeline from "./pages/Timeline";
import Messages from "./pages/messages";





/**Route*/
import PrivateRoute from "./Routers/PrivateRoute";
import PublicRoute from "./Routers/PublicRoute";

/**Firebase */
import firebase from "./utils/firebase";



export default function App() {
  //loading
  const [state, setState] = useState({
    isAuth: false,
    isLoading: true,
  })



  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setState({ isAuth: true, isLoading: false })
      } else {
        //NO USER IS SIGN IN
        setState({ isAuth: false, isLoading: false })
      }
      console.log(user)
    });
  }, [])

  if (state.isLoading) {
    return <p></p>
  }


  return (
    
    < ThemeProvider theme = { theme } >


    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" exact />
        </Route>

        <PublicRoute component={Login} isAuth={state.isAuth} restricted={true} path="/login" exact />
        <PublicRoute component={Register} isAuth={state.isAuth} restricted={true} path="/register" exact />

        <PrivateRoute component={Timeline} isAuth={state.isAuth} path="/Timeline" exact />
        <PrivateRoute component={Messages} isAuth={state.isAuth} path="/Messages"/>
       
        <PrivateRoute component={Profile} isAuth={state.isAuth} path="/profile" />
     

        <Route component={NotFound} />
      </Switch>


    </Router>
    </ThemeProvider >
  );
}
