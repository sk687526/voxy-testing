//import routesConfig from 'app/fuse-configs/routesConfig';
import * as Actions from '../../actions/fuse/index';


const initialState = {}  ;

const routes = function (state = initialState, action) {
	console.log(action);
    switch ( action.type )
    {
    	/*case Actions.SET_ROUTES:
        {
            return [
                ...action.route
            ];
        }*/
        default:
        {
            return state;
        }
    }
};

export default routes ;
