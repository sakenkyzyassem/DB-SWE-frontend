import React from "react";
import { withRouter } from 'react-router-dom';
import UserContext from "../../../services/userContext";
import {signOutDeskClerk} from '../../../services/enteringService';

class DeskClerkLogout extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
        }
    }
    
    async componentDidMount() {
        let context = this.context;
        console.log(context.user.token);
        signOutDeskClerk(context.user.token).then((res) => {
            context.setUserLogOut();
            this.props.history.push("/");
        });
    }
    

    render() {
        return (
            <div>
                Logout
            </div>
        );
        }
}

export default withRouter(DeskClerkLogout);