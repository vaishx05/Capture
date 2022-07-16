import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Button, Typography, Toolbar, Avatar, makeStyles, TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import { Badge, InputBase, Menu, MenuItem, styled } from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import CameraIcon from '@mui/icons-material/Camera';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Tooltip, Fab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#196775",
    });

    const Icons = styled(Box)(({ theme }) => ({
        display: "none",
        alignItems: "center",
        gap: "20px",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
    }));

    const UserBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        cursor: "pointer",
    }));

    const Disappear = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    }))

    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AppBar position="sticky">
                <StyledToolbar>
                    <Disappear>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <Typography variant="h5" sx={{ display: { xs: "none", sm: "block" } }}>
                                CAPTURE
                            </Typography>
                        </Link>
                    </Disappear>
                    <UserBox>
                        <CameraIcon />
                    </UserBox>
                    {user ? (
                        <>
                            <Typography variant="h6">
                                Welcome, {user.result.name}!
                            </Typography>
                            <Icons>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={(e) => setOpen(true)}
                                        size="small"
                                        sx={{ cursor: "pointer" }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar
                                            alt={user.result.name}
                                            src={user.result.imageUrl}
                                            sx={{ width: 20, height: 20, }}>
                                            {user.result.name.charAt(0)}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Icons>
                            <UserBox>
                                <Avatar
                                    onClick={(e) => setOpen(true)}
                                    sx={{ width: 20, height: 20 }}
                                    src={user.result.imageUrl}
                                />
                                <Typography variant="span">{user.result.name}</Typography>
                            </UserBox>
                        </>
                    ) : (
                        <Button
                            component={Link}
                            to="/auth"
                            variant="outlined"
                            style={{ color: "white", borderColor: "white", fontSize: "13px" }}
                        >
                            Sign In
                        </Button>
                    )}
                </StyledToolbar>
                <Menu
                    id="account-menu"
                    open={open}
                    onClose={(e) => setOpen(false)}
                    PaperProps={{
                        elevation: 4,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 6.5,
                            mr: 8.5,
                            ml: -4,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    {/* <MenuItem>
                        <Avatar /> Profile
                    </MenuItem> */}
                    <MenuItem onClick={logout} component={Link} to="/auth">
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </AppBar>
            <Link to="/search">
                <Tooltip title="Search"
                    sx={{ position: 'fixed', bottom: '0', margin: '3vh', marginBottom: '12vh', backgroundColor: "#196775" }}>
                    <Fab color="primary" aria-label="Search">
                        <SearchIcon />
                    </Fab>
                </Tooltip>
            </Link>
            <Link to="/create">
                <Tooltip title="Add"
                    sx={{ position: 'fixed', bottom: '0', margin: '3vh', backgroundColor: "#196775" }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Link>
        </React.Fragment >

    )
}

export default Navbar;