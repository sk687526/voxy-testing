import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
//import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {appsConfigs} from 'app/main/apps/appsConfigs';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';

const routeConfigs = [
    ...appsConfigs,
    ...pagesConfigs,
    //ExampleConfig,
   LoginConfig,
    RegisterConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/apps/dashboards/analytics"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
