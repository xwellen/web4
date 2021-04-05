import {combineReducers} from "redux";
import authReducer from '../Components/Auth/AuthSlice'
import pointReducer from '../Components/Main/MainSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
    point: pointReducer
})