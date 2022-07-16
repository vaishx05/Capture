import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import useStyles from './styles';
import Icon from './icon';
function AuthPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '808802570915-kquf36491onvrteejptj05it1onfeveg.apps.googleusercontent.com',
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
    };

    return (
        <div>
            <GoogleLogin
                clientId={"808802570915-kquf36491onvrteejptj05it1onfeveg.apps.googleusercontent.com"}
                render={(renderProps) => (
                    <Button className={classes.googleButton} disabled={renderProps.disabled} variant="contained" fullWidth onClick={renderProps.onClick}  >
                        <Icon />
                        &nbsp; Sign in with Google

                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
            />
        </div>
    );

}

export default AuthPage;