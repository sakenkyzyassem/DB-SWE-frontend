import React from 'react';
import UserContext from './userContext';

export default class UserContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

    }
    
    render() {
        return (
            <UserContext.Provider 
                value = {{
                    user: this.state.user,
                    setUser: newUser => {
                        this.setState({ newUser });
                    },
                    userLogout: () => {
                        this.setState({ user: null });
                    }
                }}
            >
                { this.props.children }
            </UserContext.Provider>
        );
    }
}