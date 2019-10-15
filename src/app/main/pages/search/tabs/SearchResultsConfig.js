import React from 'react';

export const SearchResultsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/search/result',
            component: React.lazy(() => import('./SearchResults'))
        }
    ]
};
