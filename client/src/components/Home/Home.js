import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import useStyles from './styles';
import Search from '../Search/Search';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import App from '../../App';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag != tagToDelete))
    }

    return (
        <Grow in>
            <Container >
                    <Grid className={classes.gridConatiner} >
                        <Grid >
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                {(!searchQuery && !tags.length) && (
                    <Paper elevation={6}>
                        <Pagination className={classes.pagination} page={page} />
                    </Paper>
                )}
            </Container>
        </Grow>
    )
}

export default Home