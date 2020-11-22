import React from "react";
import { Container, Card, Nav } from "react-bootstrap";
import {withRouter, Switch, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

import './ProfileMain.scss';
import Profile from "./Profile/Profile";
import History from "./History/History";
import UserContext from "../../services/userContext";
import LoginModal from "../../components/LoginModal/LoginModal";

class ProfileMain extends React.Component {

    render() {
        return (
            <UserContext.Consumer>
                    { state => {
                        if( state.isLoggedIn ) {
                            return (
                                <div className="ProfileMain">
                                    <Container>
                                        <Card className="mt-5 shadow Card-profile">
                                            <Card.Header>
                                                <Nav justify activeKey={`/profile/${this.props.match.params.tab}`}>
                                                    <LinkContainer to="/profile/user">
                                                        <Nav.Item>Profile</Nav.Item>
                                                    </LinkContainer>
                                                    <LinkContainer to="/profile/history">
                                                        <Nav.Item>History</Nav.Item>
                                                    </LinkContainer>
                                                </Nav>
                                            </Card.Header>
                                            <Card.Body>
                                                <Switch>
                                                    <Route path="/profile/user">
                                                        <Profile user={state.user}/>
                                                    </Route>
                                                    <Route path="/profile/history">
                                                        <History userId={state.user.userId}/>
                                                    </Route>
                                                </Switch>
                                            </Card.Body>
                                        </Card>
                                    </Container>
                                    <div className="banner"> </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <LoginModal
                                    title={"Login please"}
                                    showLogIn={!state.isLoggedIn}
                                    message={"Please, login or signup to see your profile and bookings history"}
                                />
                            )
                        }
                    }
                }
            </UserContext.Consumer>
        )
    }
}

export default withRouter(ProfileMain);