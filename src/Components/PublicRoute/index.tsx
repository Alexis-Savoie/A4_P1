import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {

    let token = localStorage.getItem("currentUserToken")
    var jwt = require('jsonwebtoken');

    let condition = false
    try {
        var decoded = jwt.verify(token, process.env.REACT_APP_JWTSECRET);
        console.log("decoded : ")
        console.log(decoded)
        condition = false
    } catch (err) {
        console.log("err : " + token)
        console.log(err)
        condition = true
    }


    return condition ? (<Route path={props.path} exact={props.exact} component={props.component} />) : (<Redirect to="/mainpage" />);
};
export default PublicRoute;