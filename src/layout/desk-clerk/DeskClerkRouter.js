import React from "react";
import { Route } from 'react-router-dom';
import DeskClerk from "../../pages/DeskClerk/Main/DeskClerk";

const routes = [
    {
        path: 'main',
        component: <DeskClerk />
    }
]

export default class DeskClerkRouter extends React.Component {

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
                        <Route path={`/deskClerk/${this.state.route.path}`}>
                            {this.state.route.component}
                        </Route>
                    :
                        null
                }
            </div>
        );
    }
}