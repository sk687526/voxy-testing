import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {setUserData, setVoxyUser} from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password})
{
    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                    dispatch(setUserData(user));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithVoxy({email, password})
{
    console.log(email);
    console.log(password);
    var status;
    return (dispatch) =>
        fetch('http://localhost:3002/users/login', {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password
              }),
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
          })
            .then((response) => {
                status = response.status;
                console.log(response);
                 if(response.status == 400)
                    response.json()
                    .then((error) => {
                    console.log(error.error); 
                    return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error.error
                    });
                })
                else{   
               response.json()
            .then((user) => {
                console.log(user.user);
                if(status != 400){
                console.log("user" + user);
                    dispatch(setVoxyUser(user.user));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            }
            )}
        })
            .catch(error => {
                console.log(" error " + error);
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithFireBase({username, password})
{
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}
