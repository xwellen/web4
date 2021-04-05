import {useSelector} from "react-redux";
import {selectAlertMessage} from "../Auth/AuthSlice";
import './Alert.css'

export const Alert = (props) => {

    const alertMessage = useSelector(selectAlertMessage);

    return (
        <div id="Alert">
            {alertMessage && <div className="alert-message alert-info" role="alert">
                {alertMessage}
            </div>}
        </div>
    )
}