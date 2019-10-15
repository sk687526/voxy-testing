import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : null
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.REGISTER_ERROR:
        {
            return {
                ...initialState,
                error: action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;