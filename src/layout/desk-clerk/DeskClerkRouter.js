import React from "react";
import {Route, Redirect} from 'react-router-dom';

import DeskClerk from "../../pages/DeskClerk/Main/DeskClerkMain";
import UserContext from "../../services/userContext";
import DeskClerkLogin from "../../pages/DeskClerk/Login/DeskClerkLogin";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ManageBookings from "../../pages/DeskClerk/ManageBookings/DeskClerkManageBookings";
import DeskClerkLogout from "../../pages/DeskClerk/Logout/DeskClerkLogout";
import DeskClerkProfile from "../../pages/DeskClerk/MyProfile/DeskClerkProfile";
import GuestPage from "../../pages/DeskClerk/ManageBookings/GuestsPage/DeskClerkGuest";

export default class DeskClerkRouter extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if ( !state.isLoggedIn || state.user.role !== 'DESKCLERK' ) {
                        return <Redirect to="/deskClerk/signIn"/>
                    }
                    else {
                        return (
                            <div>
                                <Route path='/deskClerk/main'>
                                    <Header className="row" dark="true"/>
                                    <DeskClerk />
                                    <Footer />
                                </Route>
                                <Route path="/deskClerk/guest/:id" component={GuestPage} />
                                <Route path='/deskClerk/signIn'>
                                    <DeskClerkLogin />
                                </Route>
                                <Route path='/deskClerk/logout'>
                                    <DeskClerkLogout />
                                </Route>
                                <Route path='/deskClerk/myProfile'>
                                    <Header className="row" dark="false"/>
                                    <div style={{height: "100px"}}></div>
                                    <DeskClerkProfile />
                                    <Footer />
                                </Route>
                                <Route path='/deskClerk/manageBookings'>
                                    <Header className="row" dark="false"/>
                                    <div style={{height: "100px"}}></div>
                                    <ManageBookings />
                                    <Footer />
                                </Route>
                            </div>
                        )
                    }
                }
                }
            </UserContext.Consumer>
        );
    }
}