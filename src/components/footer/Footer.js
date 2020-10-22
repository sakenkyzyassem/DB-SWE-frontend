import React from "react";
import './Footer.scss';
import { ReactComponent as Logo } from "../../static/LogoWhite.svg";

class Footer extends React.Component {

    render() {
        return (
            <div className="row footer px-4 align-content-center">
                <Logo height="40px" style={{fill: "#fff"}} />
                <p className="ml-auto">All rights reserved</p>
                <p className="mx-3">Created in 2020</p>
            </div>
        )
    }
}

export default Footer;