import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLogged} from "../Auth/AuthSlice";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const isLogged = useSelector(selectIsLogged);



    return (
        <Route {...rest} render={
            (props => {
                if(isLogged) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to="/" />
                }
            })
    }/>
    )

}