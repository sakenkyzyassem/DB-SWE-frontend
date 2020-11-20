import React from "react";
import { Route, Switch } from "react-router-dom";
import LogOut from "../../pages/Enter/Logout/LogOut";
import SignUp from "../../pages/Enter/SignUp/SignUp";
import CreateAccount from "../../pages/Enter/CreateAccount/CreateAccForm";
import CreateAccountSuccess from "../../pages/Enter/CreateAccount/CreateAccSuccess";
import SignIn from "../../pages/Enter/SignIn/SignIn";

export default class Auth extends React.Component {

    render() {
        return (
            <div>
                <Route path='/auth/logout'>
                    <LogOut />
                </Route>
                <Route path='/auth/signUp'>
                    <SignUp />
                </Route>
                <Route path='/auth/createAccount'>
                    <CreateAccount />
                </Route>
                <Route path='/auth/createAccountSuccess'>
                    <CreateAccountSuccess />
                </Route>
                <Route path='/auth/signIn'>
                    <SignIn />
                </Route>
                <Route path='/auth/employee'>
                    <SignIn role='employee' />
                </Route>
            </div>
        )
    }
}