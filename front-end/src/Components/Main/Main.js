import {useDispatch, useSelector} from "react-redux";
import {logout, selectLogin} from "../Auth/AuthSlice";
import './Main.css'
import {InteractiveElement} from "../InteractiveElement/InteractiveElement";
import {FineSettings} from "../FineSettings/FineSettings";
import {PointTable} from "../Table/PointTable";
import {Alert} from "../Alert/Alert";

export const Main = (props) => {
    const dispatch = useDispatch();
    const login = useSelector(selectLogin);

    const tryLogout = () => {
        dispatch(logout());
        localStorage.clear();
        props.history.push('/');
    };

    return (
        <div>
            <div className="header">
                <Alert/>
                <div>
                    <p className={"youare"}>You are {login}</p>
                </div>
                <div>
                    <button className="btn btn-warning" onClick={tryLogout}>Logout</button>
                </div>
            </div>

            <div className={"main"}>
                <div className="interface">
                    <InteractiveElement/>
                    <FineSettings/>
                </div>
                <div className={"pointTable"}>
                    <PointTable/>
                </div>
            </div>
        </div>
    );
}