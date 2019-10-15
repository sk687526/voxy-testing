import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, InputAdornment, Icon, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles} from '@material-ui/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector, connect} from 'react-redux';

const variantIcon = {
    error: ErrorIcon
  };
  

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

const useStyles1 = makeStyles(theme => ({
    error: {
      backgroundColor: theme.palette.error.dark,
    }
  }));

  const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
  );


const useEmailWithLocalStorage = localStorageKey => {
  const [email, setEmail] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, email);
  }, [email]);
  return [email, setEmail];
};

const usePasswordWithLocalStorage = localStorageKey => {
  const [password, setPassword] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, password);
  }, [password]);
  return [password, setPassword];
};

const useFlagWithLocalStorage = localStorageKey => {
  const [flag, setFlag] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, flag);
  }, [flag]);
  return [flag, setFlag];
};

const useTimeWithLocalStorage = localStorageKey => {
  const [time, setTime] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, time);
  }, [time]);
  return [time, setTime];
};


function Login2Page({error})
{
    const [email, setEmail] = useEmailWithLocalStorage(
    'myEmailInLocalStorage'
  );
  const onEmailChange = event => setEmail(event.target.value);

  const [password, setPassword] = usePasswordWithLocalStorage(
    'myPasswordInLocalStorage'
  );
  const onPasswordChange = event => setPassword(event.target.value);

  const [flag, setFlag] = useFlagWithLocalStorage(
    'myFlagInLocalStorage'
  );

  const [time, setTime] = useTimeWithLocalStorage(
    'myTimeInLocalStorage'
  );

    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( login.error && (login.error.email || login.error.password) )
        {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    console.log(localStorage.getItem('myFlagInLocalStorage'));
    var d=new Date('Sat Oct 12 2019 00:13:49 GMT+0530');
    console.log(email);
    console.log(password);
    console.log(localStorage.getItem('myTimeInLocalStorage'));
    
  if(email != '' && password != '' && localStorage.getItem('myFlagInLocalStorage') != ''){
   //if(new Date() - localStorage.getItem('myTimeInLocalStorage') <= 3.6e+6){
    var model = {
        email: email,
        password: password
    }
    console.log(model);
    handleSubmit(model);
   /* }
    else{
        localStorage.clear();
    }*/
  }

    function MySnackbarContentWrapper(props) {
        const classes = useStyles1();
        const { className, message, onClose, variant, ...other } = props;
        const Icon = variantIcon[variant];
      
        return (
          <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
            {...other}
          />
        );
      }

      MySnackbarContentWrapper.propTypes = {
        className: PropTypes.string,
        message: PropTypes.string,
        onClose: PropTypes.func,
        variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
      };

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        localStorage.setItem('myFlagInLocalStorage', true);
       // localStorage.setItem('myTimeInLocalStorage', new Date());
        console.log(model);
        dispatch(authActions.submitLoginWithVoxy(model));
        delay(2000).then(()=>{
            console.log(error);
            if(error){
            setOpen(true);
            }
        }
        );
        
    }


    const classes = useStyles();

    const {form, handleChange, resetForm} = useForm({
        email   : '',
        password: '',
        remember: true
    });

    const [open, setOpen] = useState(error ? true : false);

  function handleClose(event, reason) {
    
    if (reason === 'clickaway') {
        dispatch({
            type   : 'LOGIN_ERROR',
            payload: null
        });
      return;
    }

    setOpen(false);
    dispatch({
        type   : 'LOGIN_ERROR',
        payload: null
    });
  }

   /* function isFormValid()
    {
        return (
            form.email.length > 0 &&
            form.password.length > 0
        );
    }

    function handleSubmit(ev)
    {
        ev.preventDefault();
        resetForm();
    }*/
    
    console.log(open);
    console.log(error);
    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to the VOXY!
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit
                        facilisis facilisis.
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Snackbar
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                open={open}
                                autoHideDuration={3000}
                                onClose={handleClose}
                            >
                                <MySnackbarContentWrapper
                                onClose={handleClose}
                                variant="error"
                                message={error}
                                />
                            </Snackbar>
                           

                        <Typography variant="h6" className="md:w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                        <Formsy
                            onValidSubmit={handleSubmit}
                            onValid={enableButton}
                            onInvalid={disableButton}
                            ref={formRef}
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                        >

                            <TextFieldFormsy
                                className="mb-16"
                                type="text"
                                name="email"
                                label="Username/Email"
                                value="admin"
                                validations={{
                                    minLength: 4
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 4'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                }}
                                onChange={onEmailChange}
                                variant="outlined"
                                required
                            />

                            <TextFieldFormsy
                                className="mb-16"
                                type="password"
                                name="password"
                                label="Password"
                                value="admin"
                                validations={{
                                    minLength: 4
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 4'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                }}
                                onChange={onPasswordChange}
                                variant="outlined"
                                required
                            />

                            <div className="flex items-center justify-between">

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="remember"
                                                checked={form.remember}
                                                onChange={handleChange}/>
                                        }
                                        label="Remember Me"
                                    />
                                </FormControl>

                                <Link className="font-medium" to="/pages/auth/forgot-password-2">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={!isFormValid}
                                value="legacy"
                            >
                                LOGIN
                            </Button>

                        </Formsy>

                        <div className="my-24 flex items-center justify-center">
                            <Divider className="w-32"/>
                            <span className="mx-8 font-bold">OR</span>
                            <Divider className="w-32"/>
                        </div>

                        <Button variant="contained" color="secondary" size="small"
                                className="normal-case w-192 mb-8">
                            Log in with Google
                        </Button>

                        <Button variant="contained" color="primary" size="small"
                                className="normal-case w-192">
                            Log in with Facebook
                        </Button>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/register">Create an account</Link>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.auth.login.error
    };
};


export default connect(mapStateToProps)(Login2Page);
