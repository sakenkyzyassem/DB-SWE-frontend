import React from "react";
import {Link, Route} from 'react-router-dom';

import DeskClerk from "../../pages/DeskClerk/Main/DeskClerkMain";
import LoginModal from "../../components/LoginModal/LoginModal";
import UserContext from "../../services/userContext";
import DeskClerkLogin from "../../pages/DeskClerk/Login/DeskClerkLogin";
import Header from "../../components/header/deskclerk/HeaderDeskClerk";
import Footer from "../../components/footer/Footer";
import MyProfile from "../../pages/DeskClerk/MyProfile/DeskClerkProfile";
import ManageBookings from "../../pages/DeskClerk/ManageBookings/DeskClerkManageBookings";
import DeskClerkLogout from "../../pages/DeskClerk/Logout/DeskClerkLogout";

const routes = [
    {
        path: 'main',
        component: <DeskClerk />
    },
    {
        path: 'signIn',
        component: <DeskClerkLogin />
    },
    {
        path: 'logout',
        component: <DeskClerkLogout />
    },
    {
        path: 'myProfile',
        component: <MyProfile />
    },
    {
        path: 'manageBookings',
        component: <ManageBookings />
    }
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
                    if (state.isLoggedIn) {
                        if ( this.state.route && this.state.route.path === "main") {
                            return (
                                <div>
                                    <Header className="row" dark="true"/>
                                        <Route path={`/deskClerk/${this.state.route.path}`}>
                                            {this.state.route.component}
                                        </Route>
                                    <Footer />
                                </div>
                            )
                        }
                        else if ( this.state.route && this.state.route.path !== "logout") {
                            return (
                                <div>
                                    <Header className="row" dark="false"/>
                                    <div style={{height: "100px"}}></div>

                                        <Route path={`/deskClerk/${this.state.route.path}`}>
                                            {this.state.route.component}
                                        </Route>
                                    <Footer />
                                </div>
                            )
                        }
                        else if (this.state.route && this.state.route.path === "logout"){
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