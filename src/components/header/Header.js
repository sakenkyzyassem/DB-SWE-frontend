import React from "react";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ReactComponent as Logo } from "../../static/LogoWhite.svg";
import './Header.scss';
import UserContext from "../../services/userContext";
import LogOut from '../../pages/Enter/Logout/LogOut';

class Header extends React.Component {

    render() {
        return(
            <UserContext.Consumer>
                { user =>
                    <Navbar
                        bg={this.props.location.pathname === "/" ? "primary" : "white"}
                        variant={this.props.location.pathname === "/" ? "dark": "white"}
                        className={ this.props.location.pathname === "/" ? "Header fixed-top" : "Header fixed-top shadow-sm p-3 mb-5"}
                    >
                        <Navbar.Brand href="/">
                            {
                                this.props.location.pathname === "/"
                                    ? <Logo height="40px" style={{fill: "#fff"}}/>
                                    : <Logo height="40px" style={{fill: "#062041"}}/>
                            }
                        </Navbar.Brand>
                        <Navbar.Collapse className={this.props.location.pathname === "/" ? "dark" : "light"}>
                            <Nav
                                className="ml-auto mr-0"
                            >
                                <LinkContainer exact to="/" className={this.props.location.pathname === "/" ? "h mr-4 pt-2" : "mr-4 pt-2"}>
                                    <Nav.Item>Home</Nav.Item>
                                </LinkContainer>
                                {
                                    user.isLoggedIn
                                        ?
                                            <NavDropdown alignRight title="MY PAGE" id="nav-dropdown">
                                                <LinkContainer to="/profile">
                                                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/history">
                                                    <NavDropdown.Item>My Bookings</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/">
                                                    <NavDropdown.Item><LogOut></LogOut></NavDropdown.Item>
                                                </LinkContainer>
                                            </NavDropdown>
                                        :
                                            <LinkContainer to="/signIn">
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
