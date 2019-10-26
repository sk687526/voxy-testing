import {FuseUtils} from '@fuse';
import routesConfig from 'app/fuse-configs/routesConfig';

export const GET_ROUTES = 'GET_ROUTES';
export const SET_ROUTES = 'SET_ROUTES';
export const RESET_ROUTES = 'RESET_ROUTES';

export function getRoutes()
{
    return {
        type: GET_ROUTES
    }
}



export function updateRouteItem(config)
{
    return (dispatch, getState) => {
        const {routes} = getState().fuse;
        return dispatch({
            type      : SET_ROUTES,
            route: FuseUtils.setProfileRoute(routes, config)
        });
    }
}


