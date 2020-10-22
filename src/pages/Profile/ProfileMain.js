import React from "react";
import {Container, Card, Nav, Modal, Button} from "react-bootstrap";
import {withRouter, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import UserAPI from '../../services/userService';

import './ProfileMain.scss';
import Profile from "./Profile/Profile";
import History from "./History/History";
import UserContext from "../../services/userContext";

class ProfileMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            userHistory: null
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignIn = () => {
        this.props.history.push('/signIn');
    }

    handleSignUp = () => {
        this.props.history.push('/signUp');
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
                                                    <Nav justify activeKey={"/" + this.props.tab}>
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
                                                            <Profile data={state.userId}/>
                                                        </Route>
                                                        <Route path="/history">
                                                            <History data={state.userId}/>
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
                                <Modal show={!state.isLoggedIn}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Login is required</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Please, login or signup to see your profile and bookings history</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleSignIn}>
                                            SignIn
                                        </Button>
                                        <Button variant="primary" onClick={this.handleSignUp}>
                                            SignUp
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )
                        }
                    }
                }
            </UserContext.Consumer>
        )
    }
}

export default withRouter(ProfileMain);