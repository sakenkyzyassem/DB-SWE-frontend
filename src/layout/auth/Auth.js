import React from "react";
import { Route } from "react-router-dom";
import LogOut from "../../pages/Enter/Logout/LogOut";
import SignUp from "../../pages/Enter/SignUp/SignUp";
import CreateAccount from "../../pages/Enter/CreateAccount/CreateAccForm";
import CreateAccountSuccess from "../../pages/Enter/CreateAccount/CreateAccSuccess";
import SignIn from "../../pages/Enter/SignIn/SignIn";

const routes = [
    {
        path: "logout",
        component: <LogOut />
    },
    {
        path: "signUp",
        component: <SignUp />
    },
    {
        path: "createAccount",
        component: <CreateAccount />
    },
    {
        path: "createAccountSuccess",
        component: <CreateAccountSuccess />
    },
    {
        path: "signIn",
        component: <SignIn />
    },
]

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    componentDidMount() {
        let current = routes.find(
            (route) => route.path === this.props.match.params.path
        );
        this.setState({route: current});
    }

    render() {
        return (
            <div>
                {
                    this.state.route ?
                        <Route
                            path={`/auth/${this.state.route.path}`}
                        >
                            {this.state.route.component}
                        </Route>
                    :
                        null
                }
            </div>
        )
    }
}