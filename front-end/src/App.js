import React from 'react';
import {Auth} from "./Components/Auth/Auth";
import {Alert} from "./Components/Alert/Alert";
import {Route, Switch} from "react-router-dom";
import {Main} from "./Components/Main/Main";
import {ProtectedRoute} from "./Components/ProtectedRoute/ProtectedRoute";

import './Components/style.css'

class App extends React.Component {



    render() {
        return (
            <div className={"app"}>
                <Switch>
                    <Route exact path="/" component={Auth}/>
                    <ProtectedRoute
                        exact
                        path="/main"
                        component={Main}/>
                    <Route path="*" component={() => '404 not found'}/>
                </Switch>

            </div>
        )
    }
}

export default App;