import React from "react";
import { Route } from 'react-router-dom';

import ManagerProfile from "../../pages/Manager/Profile/ManagerProfile";

const routes = [
    {
        path: 'profile',
        component: <ManagerProfile />
    }
]

export default class ManagerRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }


    componentDidMount() {
        this.setState({
            route: routes.find(
                (route) => route.path === this.props.match.params.path)
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.route
                        ?
                        <Route path={`/manager/${this.state.route.path}`}>
                            {this.state.route.component}
                        </Route>
                        :
                        <p>No route found</p>
                }
            </div>
        );
    }
}