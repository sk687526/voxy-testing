import React, {useState, useEffect} from 'react';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import TimelineTab from './tabs/TimelineTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import AboutTab from './tabs/about/AboutTab';
import {connect, useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height                        : 320,
        minHeight                     : 320,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
}));

function ProfilePage({displayName})
{
     const dispatch = useDispatch();
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        
        if(cookies.get('isLoggedIn') == 'true'){ 
        jwt.verify(JSON.parse(window.localStorage.getItem('accessToken')), JSON.parse(window.localStorage.getItem('user')).data.email, function(err, decoded) {
          // err
          // decoded undefined
          if(err){
            console.log(err);
                                cookies.remove('isLoggedIn', { path: '/' });
                                window.localStorage.clear();
                                console.log(document.cookie);
                                console.log(window.localStorage);
                               // dispatch(authActions.logoutUser());
                               // userMenuClose();
                               window.location.href = './login';
          }
          else{
            console.log(decoded);
            var dateNow = new Date();

            if(decoded.exp > dateNow.getTime()){
                                cookies.remove('isLoggedIn', { path: '/' });
                                window.localStorage.clear();
                                console.log(document.cookie);
                                console.log(window.localStorage);
                                // dispatch(authActions.logoutUser());
                               // userMenuClose();
                               window.location.href = './login';
                }
                else{
                    dispatch(authActions.setVoxyUser(JSON.parse(window.localStorage.getItem('user')).data));
                     dispatch({
                        type: 'LOGIN_SUCCESS'
                      });
                }
             }
        });
    }

    }, [dispatch]);


    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    console.log(displayName);

    return (
        <FusePageSimple
            classes={{
                header : classes.layoutHeader,
                toolbar: "px-16 sm:px-24"
            }}
            header={
                <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                    <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            
                            <Avatar className="w-96 h-96">
                            {displayName[0]}
                            
                        </Avatar>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="md:ml-24" variant="h4" color="inherit">{displayName}</Typography>
                        </FuseAnimate>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                        <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    classes={{
                        root: "h-64 w-full border-b-1"
                    }}
                >
                    <Tab
                        classes={{
                            root: "h-64"
                        }}
                        label="Timeline"/>
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="About"/>
                    <Tab
                        classes={{
                            root: "h-64"
                        }} label="Photos & Videos"/>
                </Tabs>
            }
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 &&
                    (
                        <TimelineTab/>
                    )}
                    {selectedTab === 1 && (
                        <AboutTab/>
                    )}
                    {selectedTab === 2 && (
                        <PhotosVideosTab/>
                    )}
                </div>
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        displayName: state.auth.user.data.displayName
    };
};

export default connect(mapStateToProps)(ProfilePage);
