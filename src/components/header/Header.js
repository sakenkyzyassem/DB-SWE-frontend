import React from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { ReactComponent as Logo } from "../../static/LogoWhite.svg";
import './Header.scss';
import UserContext from "../../services/userContext";
import HeaderDropdown from "./HeaderDropdown";

class Header extends React.Component {

    render() {
        let theme;
        if( this.props.location.pathname === "/" || this.props.location.pathname === "/deskClerk/main" || this.props.location.pathname === "/manager/main" ){
            theme = {
                theme: "dark",
                class: "Header fixed-top",
                logo: <Logo height="40px" style={{fill: "#fff"}}/>,
                linkClass: "h mr-4 pt-2"
            }
        }
        else {
            theme = {
                theme: "white",
                class: "Header fixed-top shadow-sm p-3 mb-5",
                logo: <Logo height="40px" style={{fill: "#062041"}}/>,
                linkClass: "mr-4 pt-2"
            }
        }
        return(
            <UserContext.Consumer>
                { user =>
                    <Navbar
                        bg={theme.theme}
                        variant={theme.theme}
                        className={theme.class}
                    >
                        <Link to="/">
                            {theme.logo}
                        </Link>
                        <Navbar.Collapse className={theme.theme}>
                            <Nav
                                className="ml-auto mr-0"
                            >
                                <LinkContainer exact to="/" className={theme.linkClass}>
                                    <Nav.Item>Home</Nav.Item>
                                </LinkContainer>
                                <HeaderDropdown user={user} />
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                }
            </UserContext.Consumer>
        );
    }
};

export default withRouter(Header);
