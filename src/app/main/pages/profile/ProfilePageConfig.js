import React from 'react';

//var profileUrl = `/pages/profile/${JSON.parse(window.localStorage.getItem('user')).data.username}`;
//console.log(profileUrl);
//console.log(`/pages/profile/${JSON.parse(window.localStorage.getItem('user')).data.username}`)
export const ProfilePageConfig = {

    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : `/pages/profile`,
            component: React.lazy(() => import('./ProfilePage'))
        }
    ]
};
