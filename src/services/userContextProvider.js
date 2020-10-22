import React from 'react';
import UserContext from './userContext';

export default class UserContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isLoggedIn: false,
            // userId: null,
            isLoggedIn: true,
            userId: 1,
            setUserLoggedIn: this.setUserLoggedIn,
            setUserLogOut: this.setUserLogout
        }
    }

    setUserLoggedIn = (id) => {
        this.setState({ userId: id, isLoggedIn: true });
    }

    setUserLogout = () => {
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