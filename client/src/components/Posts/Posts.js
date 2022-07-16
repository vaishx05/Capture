import React, { useState } from 'react';
import { Grid, CircularProgress, Paper, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post'
import useStyles from './styles';

const Posts = ({ currentId, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {isLoading ? (<Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
      ) : (
        <Grid className={classes.container} container alignItems="center" justifyContent="center" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={9} sm={9} md={9} lg={9}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Posts;