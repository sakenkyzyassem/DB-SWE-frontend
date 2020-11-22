import React from "react";
import { withRouter } from 'react-router-dom';
import UserContext from "../../../services/userContext";
import {signOutEmployee, signOutGuest} from '../../../services/enteringService';

class Logout extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
        }
    }
    
    async componentDidMount() {
        let context = this.context;
        if( this.props.role === 'employee' ) {
            signOutEmployee(context.user.token).then((res) => {
                context.setUserLogOut();
                this.props.history.push("/");
            })
        }
        else {
            signOutGuest(context.user.token).then((res) => {
                context.setUserLogOut();
                this.props.history.push("/");
            });
        }
    }
    

    render() {
        return (
            <div>
                Logout
            </div>
        );
        }
}

export default withRouter(Logout);