import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, Avatar } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import * as FaIcons from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
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
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                <FaIcons.FaSearch />
                </Avatar>
                <Typography style={{marginTop:'10px'}} variant="h5">Search</Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <TextField
                            name="search"
                            variant="outlined"
                            label="Search Memories"
                            fullWidth
                            onKeyPress={handleKeyPress}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <ChipInput
                            style={{ margin: '10px 0' }}
                            value={tags}
                            label="Search Tags"
                            fullWidth
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            variant="outlined"
                        />
                    </Grid>

                    <Button onClick={searchPost} className={classes.searchButton} fullWidth variant="contained" style={{backgroundColor:"#20496b", color:'white', fontSize:'15px', marginTop:'20px'}}>
                        Search
                    </Button>
            </form>
        </Paper>
        </Container >
    )
}

export default Search;