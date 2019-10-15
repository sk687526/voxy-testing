import React, {useEffect, useReducer, useRef} from 'react';
import {Popper, ClickAwayListener, MenuItem, Icon, IconButton, ListItemIcon, ListItemText, Paper, TextField, Tooltip, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useSelector} from 'react-redux';
import {FuseUtils} from '@fuse';
import clsx from 'clsx';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withRouter} from 'react-router-dom';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';

function renderInputComponent(inputProps)
{
    const {
        variant,
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    function handleSubmit(event){
       
    }
    return (
        <div className="w-full relative">
            {variant === "basic" ? (
                    // Outlined
                    <React.Fragment >
                        <TextField
                            fullWidth
                            InputProps={{
                                
                                classes : {
                                    input         : clsx( "py-0 px-16 h-48 pr-48"),
                                    notchedOutline: "rounded-8"
                                }
                            }}
                            variant="outlined"
                            {...other}
                        />
                        <Icon  className="absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none" color="action">search</Icon>
                    </React.Fragment>
                )
                :
                (
                    // Standard
                    <TextField
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            
                            classes         : {
                                input: clsx( "py-0 px-16 h-64")
                            }
                        }}
                        variant="standard"
                        {...other}
                    />
                )}
        </div>
    );
}

export default renderInputComponent;
