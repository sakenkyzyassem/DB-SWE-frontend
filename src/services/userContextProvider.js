import React from 'react';
import axios from 'axios';
import UserContext from './userContext';

export default class UserContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

    }

    componentDidMount() {
        axios.get("/api/v1/guests")
            .then(res => {
                const users = res.data;
                const user = users[0];
                this.setState({user})
            })
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