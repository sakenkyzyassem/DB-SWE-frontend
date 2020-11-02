import React from "react";
import {Container, Card, Nav, Modal, Button} from "react-bootstrap";
import {withRouter, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

import './ProfileMain.scss';
import Profile from "./Profile/Profile";
import History from "./History/History";
import UserContext from "../../services/userContext";
import LoginModal from "../../components/LoginModal/LoginModal";

class ProfileMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            userHistory: null
        };
    }

    render() {
        return (
            <UserContext.Consumer>
                    { state => {
                        if( state.isLoggedIn ) {
                            return (
                                <div className="ProfileMain">
                                    <Container>
                                        <Card className="mt-5 shadow Card-profile">
                                            <Router>
                                                <Card.Header>
                                                    <Nav justify activeKey={`/${this.props.tab}`}>
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
                                                            <Profile user={state.user}/>
                                                        </Route>
                                                        <Route path="/history">
                                                            <History userId={state.user.userId}/>
                                                        </Route>
                                                    </Switch>
                                                </Card.Body>
                                            </Router>
                                        </Card>
                                    </Container>
                                    <div className="banner"> </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <LoginModal showLogIn={!state.isLoggedIn}/>
                            )
                        }
                    }
                }
            </UserContext.Consumer>
        )
    }
}

export default withRouter(ProfileMain);