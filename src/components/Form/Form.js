import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import FileBase from "react-file-base64";
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import useStyles from './styles';

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((postToFind) => postToFind._id === currentId)
      : null
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const user = JSON.parse(localStorage.getItem("profile"));
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper maxWidth="xs" className={classes.paper} sx={{marginTop:'10vh'}}>
        <Typography maxWidth="xs" variant="h5" align="center">
          Sign In to create your post.
        </Typography>
      </Paper>
    );
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <FaIcons.FaPlus />
        </Avatar>
        <Typography variant="h5">{currentId ? `Editing "${post.title}"` : 'Creating a Post'}</Typography>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} action="#">
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button type="submit" className={classes.buttonSubmit} variant="contained" style={{ backgroundColor: "#20496b", color: 'white', fontSize: '15px' }} fullWidth>Submit</Button>
        </form>
      </Paper>
    </Container>
  );
};
