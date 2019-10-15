import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, InputAdornment, Icon, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
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

function Register2Page({error})
{
    const dispatch = useDispatch();
    const register = useSelector(({auth}) => auth.register);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( register.error && (register.error.username || register.error.password || register.error.email) )
        {
            formRef.current.updateInputsWithError({
                ...register.error
            });
            disableButton();
        }
    }, [register.error]);

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
        dispatch(authActions.submitRegisterWithVoxy(model));
        delay(2000).then(()=>{
            if(error != undefined && error != null){
            setOpen(true);
            }
        }
        );
    }

    const classes = useStyles();

    const {form, handleChange, resetForm} = useForm({
        name                 : '',
        email                : '',
        password             : '',
        passwordConfirm      : '',
        acceptTermsConditions: false
    });

    const [open, setOpen] = useState(error ? true : false);

    function handleClose(event, reason) {
    
        if (reason === 'clickaway') {
            dispatch({
                type   : 'REGISTER_ERROR',
                payload: null
            });
          return;
        }
    
        setOpen(false);
        dispatch({
            type   : 'REGISTER_ERROR',
            payload: null
        });
      }

   /* function isFormValid()
    {
        return (
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.password.length > 3 &&
            form.password === form.passwordConfirm &&
            form.acceptTermsConditions
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

            <div
                className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

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
                        <Typography variant="h6" className="md:w-full mb-32">CREATE AN ACCOUNT</Typography>

                        <Formsy
                            onValidSubmit={handleSubmit}
                            onValid={enableButton}
                            onInvalid={disableButton}
                            ref={formRef}
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                        >

                            <TextFieldFormsy
                                className="mb-16"
                                type="text"
                                name="username"
                                label="username"
                                validations="isAlphanumeric"
                                validationErrors={{
                                    isAlphanumeric: 'username should not contain any special character'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                }}
                                autoFocus
                                type="name"
                                value={form.name}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextFieldFormsy
                                className="mb-16"
                                type="text"
                                name="displayName"
                                label="displayName"
                                validations={{
                                    minLength: 4
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 4'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                }}
                                autoFocus
                                type="name"
                                value={form.name}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextFieldFormsy
                                className="mb-16"
                                type="text"
                                name="email"
                                label="Email"
                                validations="isEmail"
                                validationErrors={{
                                    isEmail: 'Please enter a valid email'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                }}
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextFieldFormsy
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                validations="equalsField:passwordConfirm"
                                validationErrors={{
                                    equalsField: 'Passwords do not match'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                }}
                                variant="outlined"
                                 fullWidth
                                required
                            />

                            <TextFieldFormsy
                                className="mb-16"
                                type="password"
                                name="passwordConfirm"
                                label="Confirm Password"
                                validations="equalsField:password"
                                validationErrors={{
                                    equalsField: 'Passwords do not match'
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                }}
                                type="password"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <FormControl className="items-center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTermsConditions"
                                            checked={form.acceptTermsConditions}
                                            onChange={handleChange}/>
                                    }
                                    label="I read and accept terms and conditions"
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                aria-label="REGISTER"
                                disabled={!isFormValid}
                                value="legacy"
                                className="w-full mx-auto mt-16"
                            >
                                CREATE AN ACCOUNT
                            </Button>

                        </Formsy>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Already have an account?</span>
                            <Link className="font-medium" to="/login">Login</Link>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state.auth.register);
    return {
        error: state.auth.register.error
    };
};

export default connect(mapStateToProps)(Register2Page);
