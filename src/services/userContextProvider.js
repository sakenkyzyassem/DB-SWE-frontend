import React from 'react';
import UserContext from './userContext';

export default class UserContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: null,
            setUserLoggedIn: this.setUserLoggedIn,
            setUserLogOut: this.setUserLogOut,
        }
    }

    setUserLoggedIn = (user) => {
        this.setState({ isLoggedIn: true, user: user });
    }

    setUserLogOut = () => {
        this.setState({
            isLoggedIn: false,
            userId: null
        })
    }

    render() {
        return (
            <UserContext.Provider 
                value = {
                    this.state
                }
            >
                { this.props.children }
            </UserContext.Provider>
        );
    }
}