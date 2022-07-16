import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Grid, Paper, Button, Container } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import GoogleButton from "./googleButton.js";
import {signup,signin} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,navigate));
        }
        else{
            dispatch(signin(formData,navigate));
        }
        console.log(formData);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Create Account' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" style={{backgroundColor:"#20496b", color:'white', fontSize:'15px'}} className={classes.submit} >
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </Button>
                    {/* <ColoredLine color="black" /> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderBottomColor: 'black', borderBottomWidth: 1 }} />
                        <Text> &nbsp; OR &nbsp;</Text>
                        <View style={{ flex: 1, borderBottomColor: 'black', borderBottomWidth: 1 }} />
                    </View>
                    <GoogleButton />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            {isSignup ? 'Already have an account?' : "Don't have an account?"}
                            <Button color="primary" onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Create Account'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;