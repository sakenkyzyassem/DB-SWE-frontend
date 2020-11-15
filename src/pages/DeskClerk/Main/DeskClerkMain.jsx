import React from "react";
import Home from "../../Home/Home";

export default class DeskClerk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deskClerk: [],
        }
    }

    render() {
        return (
            <div>
                <Home/>
            </div>
        )
    }
}