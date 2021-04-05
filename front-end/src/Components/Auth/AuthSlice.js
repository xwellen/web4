import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {makeAlert} from "../../utils/AlertMaker";
import {getPoints} from "../Main/MainSlice";

import {baseUrl} from "../../utils/someShit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: '',
        password: '',
        isLogged: false,
        alertMessage: '',
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload.login;
            state.password = action.payload.password;
            state.isLogged = true;
        },

        logout: state => {
            state.login = '';
            state.password = '';
            state.isLogged = false;
        },

        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        },
    }
})

//TODO ВЫДЕЛИТЬ ЗАПРОСЫ В ОТДЕЛЬНУЮ ФУНКЦИЮ

export const login = userAndHistory => async (dispatch) => {
    console.log('I am in login');
    try {
        const response = await axios({
            method: "POST",
            url: `${baseUrl}/auth/login`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            data: {
                login: userAndHistory.user.login,
                password: userAndHistory.user.password
            }
        });


        dispatch(setLogin(userAndHistory.user));

        makeAlert(dispatch, response.data);
        let login = userAndHistory.user.login;
        let password = userAndHistory.user.password;
        let loginAndPassword = btoa(userAndHistory.user.login + ":" + userAndHistory.user.password);

        localStorage.setItem('user', loginAndPassword);
        dispatch(getPoints({
            login,
            password
        }));
        userAndHistory.history.push('/main');


    } catch (e) {

        console.log(e);
        if(e.response === undefined) {
            console.log(e);
        } else {
            let message = e.response.data;
            makeAlert(dispatch, message);
        }

    }
}

export const register = userAndHistory => async dispatch => {
    console.log('I am in register!')
    try {
        const response = await axios({
            method: "POST",
            url: `${baseUrl}/auth/register`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            data: {login: userAndHistory.user.login, password: userAndHistory.user.password}
        });
            console.log(response.data)
            makeAlert(dispatch, response.data);
            login(userAndHistory);

    } catch (e) {
        if(e.response !== undefined) {
            console.log(e.response.data)
            makeAlert(dispatch, e.response.data);
        } else {
            console.log(e.response);
        }
    }
}

export const {setAlertMessage, logout, setLogin} = authSlice.actions;

export const selectIsLogged = state => state.auth.isLogged
export const selectLogin = state => state.auth.login;
export const selectPassword = state => state.auth.password;
export const selectAlertMessage = state => state.auth.alertMessage;

export default authSlice.reducer;