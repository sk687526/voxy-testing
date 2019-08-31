import axios from 'axios';

export const GET_WIDGETS = '[ANALYTICS DASHBOARD APP] GET WIDGETS';

export function getWidgets()
{
    const request = axios.get('/api/analytics-dashboard-app/widgets');

    return (dispatch) =>
        request.then((response) =>{
        	console.log(response);
            dispatch({
                type   : GET_WIDGETS,
                payload: response.data
            })}
        );
}
