import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, NavDropdown} from "react-bootstrap";

export default class HeaderDropdown extends React.Component {
    render() {
        let user = this.props.user;
        if ( user.isLoggedIn===false ){
            if( user.role === 'GUEST' ){
                return (
                    <NavDropdown alignRight title="MY PAGE" id="nav-dropdown">
                        <LinkContainer to="/profile/user">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/profile/history">
                            <NavDropdown.Item>My Bookings</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/auth/logout">
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )
            }
            else if(user.role === 'DESKCLERK') {
                return (
                    <NavDropdown alignRight title="MY PAGE" id="nav-dropdown">
                        <LinkContainer to="/deskClerk/myProfile">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/deskClerk/manageBookings">
                            <NavDropdown.Item>Manage Bookings</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/deskClerk/logout">
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )
            }
            else {
                return (
                    <NavDropdown alignRight title="MY PAGE" id="nav-dropdown">
                        <LinkContainer to="/manager/profile">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/manager/manageHotels">
                            <NavDropdown.Item>Manage Hotels</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/manager/manageEmployees">
                            <NavDropdown.Item>Manage Employees</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/manager/logout">
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )
            }
        }
        else {
            return (
                <LinkContainer to="/auth/signIn">
                    <Button variant="additional">
                        Sign In
                    </Button>
                </LinkContainer>
            )
        }
    }
}