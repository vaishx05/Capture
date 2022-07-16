import React, { useState } from 'react';
import { Box, Container, createTheme } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Search from './components/Search/Search';
import Form from './components/Form/Form';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/search" exact element={<Search />} />
                    <Route path="/create" exact element={<Form />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" exact element={<PostDetails />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
