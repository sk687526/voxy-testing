import React from 'react';

var username = "abcd";
export const ProfilePageConfig = {

    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/profile',
            component: React.lazy(() => import('./ProfilePage'))
        }
    ]
};
