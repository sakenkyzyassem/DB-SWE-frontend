import React from "react";
import { BrowserRouter as Link } from 'react-router-dom';
import {ReactComponent as Logo} from "../static/LogoWhite.svg";
import './Header.scss';

function Header(dark){

        return(
            <div className="Header navbar navbar-dark navbar-expand-sm fixed-top">
                <Link className="navbar-brand" to="/">
                    <Logo className="Logo" height="40px" />
                </Link>
                <div id="Navbar" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto mr-0">
                        <li className="nav-item mr-4">
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                        <li className="nav-item mr-4">
                            <Link className="nav-link" to="/profile">PROFILE</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
}

export default Header;