import React from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ReactComponent as Logo } from "../../../static/LogoWhite.svg";
import '../Header.scss';
import UserContext from "../../../services/userContext";

class Header extends React.Component {

    render() {
        return(
            <UserContext.Consumer>
                { user =>
                    <Navbar
                        bg={this.props.location.pathname === "/deskClerk/main" ? "primary" : "white"}
                        variant={this.props.location.pathname === "/deskClerk/main" ? "dark": "white"}
                        className={ this.props.location.pathname === "/deskClerk/main" ? "Header fixed-top" : "Header fixed-top shadow-sm p-3 mb-5"}
                    >
                        <Navbar.Brand href="/deskClerk/main">
                            {
                                this.props.location.pathname === "/deskClerk/main"
                                    ? <Logo height="40px" style={{fill: "#fff"}}/>
                                    : <Logo height="40px" style={{fill: "#062041"}}/>
                            }
                        </Navbar.Brand>
                        <Navbar.Collapse className={this.props.location.pathname === "/deskClerk/main" ? "dark" : "light"}>
                            <Nav
                                className="ml-auto mr-0"
                            >
                                <LinkContainer exact to="/deskClerk/main" className={this.props.location.pathname === "/deskClerk/main" ? "h mr-4 pt-2" : "mr-4 pt-2"}>
                                    <Nav.Item>Home</Nav.Item>
                                </LinkContainer>
                                {
                                    user.isLoggedIn
                                        ?
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
                                        :
                                            <LinkContainer to="/deskClerk/signIn">
                                                <Button variant="additional">
                                                    Sign In
                                                </Button>
                                            </LinkContainer>

                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                }
            </UserContext.Consumer>
        );
    }
};

export default withRouter(Header);
