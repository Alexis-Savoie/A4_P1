import React from "react";
import { Route, Redirect } from "react-router-dom";



const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {

    let token = localStorage.getItem("currentUserToken")
    
    var jwt = require('jsonwebtoken');

    let condition = false
    try {
        var decoded = jwt.verify(token, process.env.REACT_APP_JWTSECRET);
        console.log("decoded : " + token)
        console.log(decoded)
        condition = true
    } catch (err) {
        console.log("err : " + token)
        console.log(err)
        condition = false
    }




    return condition ? (<Route path={props.path} exact={props.exact} component={props.component} />) : (<Redirect to="/login" />);
};
export default PrivateRoute;