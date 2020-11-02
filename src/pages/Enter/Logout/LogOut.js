import React from "react";
import { withRouter } from 'react-router-dom';
// import UserContext from "../../../services/userContext";
import {signOutGuest} from '../../../services/enteringService';
import {SignInContext} from '../../Enter/SignIn/SignIn';

class Logout extends React.Component {
    static contextType = SignInContext;

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
            token: "2"
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    async logoutUser(e) {
        const guest = {
            token: this.state.token
        }
        console.log(guest.token);
        signOutGuest(guest).then((res) => {
            console.log(res);
        });
    }

    componentDidMount() {
        // this.context.userLogOut();
        // this.props.history.push("/");
        const tokenValue = this.context.tokenValue;
        this.setState({token: tokenValue});
    }

    render() {
        return (
            <div onClick={this.logoutUser}>
                Logout
            </div>
        );
    }
}

export default withRouter(Logout);