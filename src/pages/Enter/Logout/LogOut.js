import React from "react";
import { withRouter } from 'react-router-dom';
import UserContext from "../../../services/userContext";

class Logout extends React.Component {
    static contextType = UserContext;

    componentDidMount() {
        this.context.userLogOut();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withRouter(Logout);