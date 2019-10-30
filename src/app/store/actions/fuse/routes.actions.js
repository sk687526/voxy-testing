import {FuseUtils} from '@fuse';
import routesConfig from 'app/fuse-configs/routesConfig';

export const GET_ROUTES = '[ROUTES] GET ROUTES';
export const SET_ROUTES = '[ROUTES] SET ROUTES';
export const RESET_ROUTES = '[ROUTES] RESET ROUTES';

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
            route: FuseUtils.setRoute(routes, config)
        });
    }
}


