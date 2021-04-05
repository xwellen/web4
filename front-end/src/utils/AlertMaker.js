import {setAlertMessage} from "../Components/Auth/AuthSlice";

export const makeAlert = (dispatch, message) => {
    dispatch(setAlertMessage(message));
    setTimeout(() => {
        dispatch(setAlertMessage(''))
    }, 2200)
}