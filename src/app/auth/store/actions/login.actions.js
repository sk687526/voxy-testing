import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {setUserData, setVoxyUser} from './user.actions';
import * as Actions from 'app/store/actions';
//import { useCookies } from 'react-cookie';

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

//const [cookies, setCookie, removeCookie] = useCookies(['user']);
export function submitLoginWithVoxy({email, password})
{
    
    console.log(email);
    console.log(password);
    var status;
    return (dispatch) =>
        fetch('https://gentle-taiga-32940.herokuapp.com/users/login', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
             // mode: 'same-origin',
                //redirect: 'follow',
                credentials: 'include',
               // withCredentials: true,

              body: JSON.stringify({
                email: email,
                password: password
              })
              
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
                console.log(user.obj.data);
                if(status != 400){
                    console.log(user);
                    //setCookie('user', userCookie, { path: '/' })
                    //cookies.get('accessToken');
                    console.log(user.obj.data);
                    //var obj1 = user.obj.accessToken;
                    //var obj2 = user.obj.data;
                    window.localStorage.setItem('accessToken', JSON.stringify(user.obj.accessToken));
                    
                
                    dispatch(setVoxyUser(user.obj.data));

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
