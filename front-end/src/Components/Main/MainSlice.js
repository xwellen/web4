import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import {baseUrl} from "../../utils/someShit";

export const mainSlice = createSlice({
    name: 'point',
    initialState: {
        points: []
    },
    reducers: {
        setPoints: (state, action) => {
            state.points = action.payload;
        },
        addPoint: (state, action) => {
            state.points = state.points.concat([action.payload]);
        }
    }
})

export const getPoints = user => async (dispatch) => {
    console.log('I am in getPoints');
    let token = `Basic: ${btoa(user.login + ':' + user.password)}`
    console.log(token);
    try {
        const response = await axios({
            method: "GET",
            url: `${baseUrl}/points`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': token
            },
        });
        let data = response.data;
        dispatch(setPoints(data));
    } catch (e) {
        if(e.response !== undefined) {
            console.log(e.response.data);
        } else {
            console.log(e.response);
        }
    }

}

export const sendPoint = (user, point) => async (dispatch) => {
    console.log("I am in sendPoint");

    let token = `Basic: ${btoa(user.login + ':' + user.password)}`

    try {
        const response = await axios({
            method: "POST",
            url: `${baseUrl}/points/`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': token
            },
            data: point
        });
        dispatch(addPoint(response.data));
    } catch (e) {
        if(e.response !== undefined) {
            console.log(e.response.data);
        } else {
            console.log(e.response);
        }
    }
}

export const {setPoints, addPoint} = mainSlice.actions;

export const selectPoints = state => state.point.points;

export default mainSlice.reducer;