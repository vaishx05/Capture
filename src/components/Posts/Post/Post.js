import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, CardHeader, Checkbox, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, MoreVert} from '@mui/icons-material';


const Post = ({ post, currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setlikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem("profile"));
    const userId = (user?.result?.googleId || user?.result?._id);
    const hasLikedPost = post.likes.find((like) => like === userId);


    const handleLike = async () => {
        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setlikes(post.likes.filter((id) => id !== userId))
        }
        else {
            setlikes([...post.likes, userId])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return hasLikedPost ? (
                <>
                    <FavoriteIcon style={{ color: 'red' }} />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <IconButton aria-label="add to favorites">
                        <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                        />
                    </IconButton>
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }
        return (<>
            {/* <FavoriteIcon style={{ color: 'red' }} />  */}
            <IconButton aria-label="add to favorites">
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
            </IconButton>
            Like </>);
    };

    const openPost = () => navigate(`/posts/${post._id}`);

    return (
        <Card className={classes.card} elevation={6} sx={{ marginTop: 10 }}>
            <ButtonBase className={classes.cardAction}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
                    </div>
                )}
                <div onClick={openPost}>
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                    </CardContent>
                </div>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result}
                    onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => { dispatch(deletePost(post._id)) }}><DeleteIcon fontSize="small" /> Delete</Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;