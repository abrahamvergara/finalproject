import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import firebase, { auth } from "../utils/firebase";

const db = firebase.firestore();

function SendMessage() {
  const [msg, setMsg] = useState("");


  async function sendMessage(e) {
    
    e.preventDefault();

    const currentUser = firebase.auth().currentUser;

    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("messages")
      .add({
        text: msg,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setMsg("");
  }

  return (
    <div className="messages">
      <form onSubmit={sendMessage}>
          <br></br>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message here"
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}

export default SendMessage;
