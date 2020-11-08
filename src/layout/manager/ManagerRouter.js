import React from "react";
import {Link, Route} from 'react-router-dom';

import ManagerProfile from "../../pages/Manager/Profile/ManagerProfile";
import LoginModal from "../../components/LoginModal/LoginModal";
import UserContext from "../../services/userContext";
import ManagerLogin from "../../pages/Manager/Login/ManagerLogin";

const routes = [
    {
        path: "profile",
        component: <ManagerProfile />
    },
    {
        path: "signIn",
        component: <ManagerLogin />
    }
]

export default class ManagerRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }


    componentDidMount() {
        this.setState({
            route: routes.find(
                (route) => route.path === this.props.match.params.path)
        });
    }

    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if ( state.isLoggedIn && state.user.role === "MANAGER" ) {
                        if( this.state.route ) {
                            return (
                                <Route path={`/manager/${this.state.route.path}`}>
                                    {this.state.route.component}
                                </Route>
                            )
                        }
                        else {
                            return (
                                <p className="p-5">No such route found <br/>
                                    <Link to="/">GO HOME</Link>
                                </p>
                            )
                        }
                    }
                    else if ( this.state.route && this.state.route.path === "signIn" ) {
                        return (
                            <Route path={`/manager/${this.state.route.path}`}>
                                {this.state.route.component}
                            </Route>
                        )
                    }
                    else {
                        return (
                            <LoginModal
                                route={"manager"}
                                title={"Authentication is required"}
                                showLogIn={true}
                                message={"Sign in using your work account to access this page"}
                            />
                        )
                    }
                }
                }
            </UserContext.Consumer>
        );
    }
}