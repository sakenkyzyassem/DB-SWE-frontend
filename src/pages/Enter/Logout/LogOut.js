import React from "react";
import { withRouter } from 'react-router-dom';
import UserContext from "../../../services/userContext";
import {signOutGuest} from '../../../services/enteringService';

class Logout extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        let loggedIn = true;
        // const context = React.useContext(SignInContext);
        // this.setState({token: this.context.tokenValue});
        // if(token==null){
        //     loggedIn = false;
        // }
        this.state = {
            validated: false,
            loggedIn,
            token: "h"
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    async logoutUser(token) {
        signOutGuest(token).then((res) => {
            console.log(res);
            console.log(token);
        });
    }

    componentDidMount() {
        // this.context.userLogOut();
        this.props.history.push("/");
    }
    

    render() {
        return (
            <UserContext.Consumer>
                {value => (
            <div onClick={this.logoutUser(value.token)}>
                Logout
            </div>
                )}
            </UserContext.Consumer>
        );
        }
}

export default withRouter(Logout);