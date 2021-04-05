import {useDispatch, useSelector} from "react-redux";
import {getPoints, selectPoints} from "../Main/MainSlice";
import {useEffect} from "react";
import './table.css'

export const PointTable = () => {

    const dispatch = useDispatch();
    const points = useSelector(selectPoints);

    const [login, password] = atob(localStorage.getItem('user')).split(':');


    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Result</th>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">R</th>
            </tr>
            </thead>
            <tbody>
            {/*{console.log(points)}*/}
            {/*{console.log(typeof points)}*/}
            {points.map((point, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{point.result.toString()}</td>
                        <td>{point.x}</td>
                        <td>{point.y}</td>
                        <td>{point.r}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}