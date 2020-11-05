import React from "react";
import UserContext from "../../../services/userContext";
import LoginModal from "../../../components/LoginModal/LoginModal";

export default class ManagerProfile extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if (state.isLoggedIn && state.user.role === 'Manager') {
                        return (
                            <p>This is Manager's workspace</p>
                        )
                    } else {
                        return (
                            <LoginModal
                                title={"Authentication is required"}
                                showLogIn={!state.isLoggedIn}
                                message={"Sign in using your work account to access this page"}
                            />
                        )
                    }
                }
                }
            </UserContext.Consumer>
        )
    }
}