import { combineReducers } from 'redux';
import login from '~/Redux/reducers/LoginReducer'
import loading from '~/Redux/reducers/Loading'
import userprofile from '~/Redux/reducers/UserProfile'
import httpClient from '~/Redux/reducers/ClientReducer'
import language from '~/Redux/reducers/LanguageReducer'

const rootReducer = combineReducers({
    login,
    loading,
    userprofile,
    httpClient,
    language,
});

export default rootReducer;
