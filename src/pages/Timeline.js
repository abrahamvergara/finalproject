import React, { useState, useEffect } from "react";
import Nav from "../Components/nav";
import firebase from "../utils/firebase";

import pusa2 from '../pic/pusa.png'

import {
  makeStyles,
  Grid,
  TextField,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Typography,
  IconButton,
} from "@material-ui/core";
//import { width } from "@material-ui/system";//
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    direction: "column",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 500,
  },
}));

const db = firebase.firestore();

export default function Timeline() {
  const [user, setUser] = useState({
    user: null,
  });

  useEffect(() => {
    var signedUser = firebase.auth().currentUser;

    if (signedUser) {
      // User is signed in.
      setUser({ user: signedUser });
    } else {
      // No user is signed in.
      setUser(null);
    }
  }, []);

  const [payload, setPayload] = useState({
    post: "",
  });

  const classes = useStyles();

  const [state, setstate] = useState({
    posts: [],
    userUid: "",
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = () => {
      const currentUser = firebase.auth().currentUser;

      db.collection("users")
        .doc(currentUser.uid)
        .collection("posts")
        .orderBy("created", "desc")
        .onSnapshot((doc) => {
          let postList = [];
          doc.forEach((post) => {
            postList.push({ ...post.data(), id: post.id });
          });

          setstate({
            posts: postList,
            userUid: currentUser.uid,
            isLoading: false,
          });
        });
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setPayload({ post: e.target.value });
  };

  const addPost = () => {
    db.collection("users")
      .doc(state.userUid)
      .collection("posts")
      .add({ post: payload.post, created: new Date() })
      .then((docRef) => {
        //success
        setPayload({ post: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePost = (docId) => {
    db.collection("users")
      .doc(state.userUid)
      .collection("posts")
      .doc(docId)
      .delete()
      .then(() => {
        //success
      })
      .catch((err) => {
        //error
      });
  };

  if (state.isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={160} />
      </div>
    );
  }

  return (
    <div className="myDiv">
      <Nav />

      <Grid container direction="column" spacing={2} alignItems="center">
        ;
        <Grid item className={classes.card}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center" justify="center">
              <img src={pusa2} className="pusa2" alt="logo2" />
                <Grid item>
                  <TextField
                    variant="outlined"
                    placeholder="What's on your mind?"
                    value={payload.post}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={addPost}>
                    Post
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br></br>

          <Grid
            className="gridPost"
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            {state.posts.map((post) => (
              <React.Fragment key={post.id}>
                <Grid container direction="column">
                  <Typography key={post.id} variant="h6">
                    <p class="userPost">
                      {user.user ? user.user.email : "null"}
                      <IconButton
                        class="deleteIcon"
                        onClick={() => deletePost(post.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </p>
                    {post.post}
                  </Typography>
                  <br></br>
                  <br></br>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
