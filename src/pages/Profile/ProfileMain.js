import React from "react";
import {Container, Col, Row, Card, Nav} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

import './ProfileMain.scss';
import Profile from "./Profile/Profile";
import History from "./History/History";
import UserContext from '../../services/userContext';

class ProfileMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UserContext.Consumer>
                { user =>
                <div className="ProfileMain">
                    <Container>
                        <Card className="m-5 shadow Card">
                            <Router>
                                <Card.Header>
                                    <Nav justify activeKey={"/"+this.props.tab}>
                                        <LinkContainer to="/profile">
                                            <Nav.Item>Profile</Nav.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/history">
                                            <Nav.Item>History</Nav.Item>
                                        </LinkContainer>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <Switch>
                                        <Route path="/profile">
                                            <Profile user = {user.user}/>
                                        </Route>
                                        <Route path="/history">
                                            <History />
                                        </Route>
                                    </Switch>
                                </Card.Body>
                            </Router>
                        </Card>
                    </Container>
                </div>
                }
            </UserContext.Consumer>
        )
    }
}

export default ProfileMain;