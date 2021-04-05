import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {register, login, selectAlertMessage, selectValue, setAlertMessage, selectIsLogged} from "./AuthSlice";
import {validateUser} from '../../utils/UserValidator'
import React from 'react'
import './Auth.css'
import {makeAlert} from "../../utils/AlertMaker";
import axios from "axios";
import {Alert} from "../Alert/Alert";
import {Headder} from "../Headder/Headder";

export const Auth = (props) => {

    const isLogged = useSelector(selectIsLogged)
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('user') != null) {
            let userStr = atob(localStorage.getItem('user'));
            let [username, password] = userStr.split(':');

            let user = {
                login: username,
                password
            }

            let userAndHistory = {
                user,
                history: props.history
            }

            dispatch(login(userAndHistory));
        }
    })

    const loginClick = () => {
        let user = getUser();

        if (validateUser(user)) {
            dispatch(login(getUserAndHistory()))

        } else {
            makeAlert(dispatch, 'Wrong user/password!')
        }
    }

    const regiserClick = () => {
        let user = getUser();

        if (validateUser(user)) {
            dispatch(register(getUserAndHistory()));
        } else {
            makeAlert(dispatch, 'Wrong user/password!')
        }
    }

    const getUserAndHistory = () => {
        let user = getUser();
        let history = props.history;
        return {
            user,
            history
        }
    }

    const getUser = () => {
        return {
            login: document.getElementById('loginInput').value,
            password: document.getElementById('passwordInput').value
        }
    }


    return (
        <>
            <Headder/>
            <div className="auth">
                <Alert/>

                <div className="">
                    <label htmlFor="loginInput" className="form-label">Login</label>
                    <input type="login" className="form-control" id="loginInput"/>
                </div>
                <div className="">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"/>
                </div>
                <button onClick={loginClick} className="btn btn-success">Login</button>
                <button onClick={regiserClick} className="btn btn-warning">Register</button>
            </div>
        </>

    )
}