import React from "react";
import {Link, Route, Redirect} from 'react-router-dom';

import UserContext from "../../services/userContext";
import ManagerProfile from "../../pages/Manager/Profile/ManagerProfile";

export default class ManagerRouter extends React.Component {

    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if ( !state.isLoggedIn ) {
                        return (
                            <Redirect to="/manager/signIn" />
                            )
                    }
                    else {
                        return (
                            <div>
                                <Route path='/manager/profile'>
                                    <ManagerProfile/>
                                </Route>
                                <p className="p-5">No such route found <br/>
                                    <Link to="/">GO HOME</Link>
                                </p>
                            </div>
                        )
                        }
                    }
                }
                }
            </UserContext.Consumer>
        );
    }
}