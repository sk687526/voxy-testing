import firebaseService from 'app/services/firebaseService';
import * as UserActions from './user.actions';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({displayName, password, email})
{
    return (dispatch) =>
        jwtService.createUser({
            displayName,
            password,
            email
        })
            .then((user) => {
                    dispatch(UserActions.setUserData(user));
                    return dispatch({
                        type: REGISTER_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            });
}

export function submitRegisterWithVoxy({displayName, password, passwordConfirm, email})
{
    return (dispatch) =>
        fetch('http://localhost:3002/users/register', {
              method: "POST",
              body: JSON.stringify({
                displayName: displayName,
                email: email,
                password: password,
                confirmPassword: passwordConfirm
              }),
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
          })
           .then((response) => response.json())
            .then((user) => {
                console.log(user);

                   dispatch(UserActions.setVoxyRegisterUser(user));

                    return dispatch({
                        type: REGISTER_SUCCESS
                    });
                }
            )
            .catch(error => {
                console.log(error);
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            });
}

export function registerWithFirebase(model)
{
    const {email, password, displayName} = model;
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                dispatch(UserActions.createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    email
                }));

                return dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];

                const emailErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email'
                ];

                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    email      : emailErrorCodes.includes(error.code) ? error.message : null,
                    displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password   : passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: response
                });
            });
}
