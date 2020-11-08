import React from "react";
import {Link, Route} from 'react-router-dom';

import DeskClerk from "../../pages/DeskClerk/Main/DeskClerk";
import LoginModal from "../../components/LoginModal/LoginModal";
import UserContext from "../../services/userContext";
import DeskClerkLogin from "../../pages/DeskClerk/Login/DeskClerkLogin";

const routes = [
    {
        path: 'main',
        component: <DeskClerk />
    },
    {
        path: 'signIn',
        component: <DeskClerkLogin />
    },
]

export default class DeskClerkRouter extends React.Component {

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
                    console.log(state);
                    if (state.isLoggedIn && state.user.role === "DESKCLERK" ) {
                        if ( this.state.route ) {
                            return (
                                <Route path={`/deskClerk/${this.state.route.path}`}>
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
                            <Route path={`/deskClerk/${this.state.route.path}`}>
                                {this.state.route.component}
                            </Route>
                        )
                    }
                    else {
                        return (
                            <LoginModal
                                route={"deskClerk"}
                                title={"Authentication is required"}
                                showLogIn={!state.isLoggedIn}
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