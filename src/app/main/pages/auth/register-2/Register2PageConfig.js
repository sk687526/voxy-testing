import React from 'react';

export const Register2PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/register',
            component: React.lazy(() => import('./Register2Page'))
        }
    ]
};
