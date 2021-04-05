import React, {useEffect} from "react"
import {drawBase, processCanvasClick} from "../../utils/script";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectPassword, setAlertMessage} from "../Auth/AuthSlice";
import {addPoint, getPoints, selectPoints, sendPoint} from "../Main/MainSlice";

import './interractiveElement.css'

export const InteractiveElement = () => {

    const login = useSelector(selectLogin)
    const password = useSelector(selectPassword)

    const points = useSelector(selectPoints)
    const dispatch = useDispatch();


    useEffect(() => {
        document.querySelector('.rinput').textContent = '1';

        drawBase(points);
    })

    const processClick = (e) => {
        if (!processCanvasClick(e)) return;
        const point = processCanvasClick(e);

        console.log('HERE');
        console.log(point)

        let message = '';
        if (point.x < -5 || point.x > 3) {
            message += 'X must be between -5 and 3 \n';
        }

        if (point.y < -5 || point.y > 3) {
            message += 'Y must be between -5 and 3 \n'
        }

        if (point.r <= 0 || point.r > 3) {
            message += 'R must be between -5 and 3 \n';
        }
        console.log('HERE');
        console.log(message);
        if(message !== '') {
            dispatch(setAlertMessage(message));
        } else {
            let user = {
                login,
                password
            }
            dispatch(sendPoint(user, point));
            dispatch(getPoints(user));
        }
    }

    return (
        <div className="interactive-el col">
            <div id="canvas">
                <canvas onClick={processClick}
                        width="800px" height="450px"
                        id="graphicCanvas"/>
            </div>
        </div>
    )
}