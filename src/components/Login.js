import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../stateProvide';

function Login() {

    const [{}, dispatch] = useStateValue();

    const onSignInButton = (e) => {
        auth.signInWithPopup(provider)
            .then(response => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: response.user
                });
            })
            .catch(err => {
                alert(err.message)
            });
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Whats App"/>

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={onSignInButton}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login;
