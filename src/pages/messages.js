import React, { useState, useEffect } from "react";
import Nav from "../Components/nav";
import SendMessage from "../Components/SendMessage";
import firebase from "../utils/firebase";
import { auth } from "../utils/firebase";

const db = firebase.firestore();

export default function Messages() {
  const [state, setState] = useState({
    user: null,
  });

  useEffect(() => {
    var signedUser = firebase.auth().currentUser;

    if (signedUser) {
      // User is signed in.
      setState({ user: signedUser });
    } else {
      // No user is signed in.
      setState(null);
    }
  }, []);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    db.collection("users")
      .doc(currentUser.uid)
      .collection("messages")
      .orderBy("created")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className='msgs'>
        {messages.map(({ id, text, uid }) => (
          <div>
            <div
              key={id}
              className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}
            >
              <p class="chatname">{state.user ? state.user.email : "null"}</p>
              <p>{text}</p>
            </div>
          </div>
        ))}
        <SendMessage />
      </div>
    </div>
  );
}
