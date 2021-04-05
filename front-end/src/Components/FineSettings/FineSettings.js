
import {Input} from 'react-toolbox/lib/input';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectPassword, setAlertMessage} from "../Auth/AuthSlice";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './FineSettings.css'
import {getPoints, selectPoints, sendPoint} from "../Main/MainSlice";
import {drawBase} from "../../utils/script";
import {getNowPoints} from "../../utils/script";



export const FineSettings = () => {

    const dispatch = useDispatch();

    const login = useSelector(selectLogin);
    const password = useSelector(selectPassword);

    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [rValue, setRValue] = useState(1);


    const sendThisShit = () => {
        let x = getX();
        let y = getY();
        let r = getR();

        console.log(x, y, r);

        let message = '';
        if (x < -5 || x > 3) {
            message += 'X must be between -5 and 3 \n';
        }

        if (y < -5 || y > 3) {
            message += 'Y must be between -5 and 3 \n';
        }

        if (r <= 0 || r > 3) {
            message += 'R must be between 0 and 3 \n';
        }

        console.log(message);

        if (message !== '') {
            dispatch(setAlertMessage(message));
        } else {
            let user = {login, password};
            let point = {x, y, r};
            dispatch(sendPoint(user, point));
            dispatch(getPoints(user));
        }

    }

    const getX = () => {
        return round(xValue);
    }

    const getY = () => {
        return round(yValue);
    }

    const getR = () => {
        return round(rValue);
    }

    const round = (x) => {
        return Math.round(x * 100) / 100;
    }

    return (
        <div className="fine-settings col">

            <div className="settings container row">
                <div className="col">
                    <h3>Choose X</h3>

                    <input
                        id='xInput1'
                        className='xinput'
                        onChange={e => setXValue(e.target.value)}
                        value={xValue}
                        type='text'
                        name='xInput1'
                        maxLength={6}
                    />

                </div>

                <div className="col">

                    <h3>Choose Y</h3>

                    <input
                        id='yInput1'
                        className='yinput'
                        onChange={e => setYValue(e.target.value)}
                        value={yValue}
                        type='text'
                        name='yInput1'
                        maxLength={6}
                    />

                </div>

                <div className="col">
                    <h3>Choose R</h3>

                    <input
                        id='rInput1'
                        className='rinput'
                        onChange={e => {
                            setRValue(e.target.value);

                        }}
                        value={rValue}
                        type='text'
                        name='rInput1'
                        maxLength={6}
                    />

                </div>

            </div>
            <div className={"container"}>
                <button onClick={sendThisShit} className="btn btn-success">Send</button>
            </div>


        </div>
    )
}