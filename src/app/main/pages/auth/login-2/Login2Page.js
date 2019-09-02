import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, InputAdornment, Icon, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login2Page()
{

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
        console.log(model);
        dispatch(authActions.submitLoginWithVoxy(model));
    }


    const classes = useStyles();

    const {form, handleChange, resetForm} = useForm({
        email   : '',
        password: '',
        remember: true
    });

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

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to the FUSE!
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

export default Login2Page;
