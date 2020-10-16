import React from "react";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ReactComponent as Logo } from "../../static/LogoWhite.svg";
import './Header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if(window.location.pathname === '/signUp' || window.location.pathname === '/createAccount' || window.location.pathname === '/signIn' || window.location.pathname === '/createAccountSuccess') return null;
        return(
            <Navbar
                bg={this.props.location.pathname === "/" ? "primary" : "light"}
                variant={this.props.location.pathname === "/" ? "dark": "light"}
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
                        <LinkContainer exact to="/" className="mr-4 pt-2">
                            <Nav.Item>HOME</Nav.Item>
                        </LinkContainer>
                        <NavDropdown alignRight title="MY PAGE" id="nav-dropdown">
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>My Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/history">
                                <NavDropdown.Item>My Bookings</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

export default withRouter(Header);
