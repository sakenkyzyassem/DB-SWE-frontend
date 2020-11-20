import React from "react";
import {Route, Redirect} from 'react-router-dom';

import UserContext from "../../services/userContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ManageBookings from "../../pages/DeskClerk/ManageBookings/DeskClerkManageBookings";
import GuestPage from "../../pages/DeskClerk/ManageBookings/GuestsPage/DeskClerkGuest";
import EmployeeProfile from "../../pages/Profile/EmployeeProfile/EmployeeProfile";

export default class DeskClerkRouter extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if ( !state.isLoggedIn || (state.user && state.user.role !== 'DESKCLERK') ) {
                        return <Redirect to="/auth/employee"/>
                    }
                    else {
                        return (
                            <div>
                                <Route path="/deskClerk/guest/:id" component={GuestPage} />
                                <Route path='/deskClerk/myProfile'>
                                    <Header className="row" dark="false"/>
                                    <div style={{height: "100px"}}></div>
                                    <EmployeeProfile />
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