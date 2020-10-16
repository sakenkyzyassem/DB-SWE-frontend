import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Col } from 'react-bootstrap';
import './App.scss';
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import ProfileMain from "./pages/Profile/ProfileMain";
import UserContextProvider from './services/userContextProvider';
import SignUp from './pages/Enter/SignUp/SignUp';
import CreateAccount from './pages/Enter/CreateAccount/CreateAccForm';
import SignIn from './pages/Enter/SignIn/SignIn';
import CreateAccountSuccess from './pages/Enter/CreateAccount/CreateAccSuccess';

function App() {

    return (
        <UserContextProvider>
            <div className="App">
                <Router>
                    <Header className="row" dark="true"/>
                    <div className="App-content">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/signUp">
                                <SignUp tab="signUp"/>
                            </Route>
                            <Route path="/createAccount">
                                <CreateAccount tab="createAccount"/>
                            </Route>
                            <Route path="/createAccountSuccess">
                                <CreateAccountSuccess tab="createAccountSuccess"/>
                            </Route>
                            <Route path="/signIn">
                                <SignIn tab="signIn"/>
                            </Route>
                            <Route path="/profile">
                                <ProfileMain tab="profile"/>
                            </Route>
                            <Route path="/history">
                                <ProfileMain tab="history"/>
                            </Route>
                            <Route path="*" className="col">
                                <Col>
                                <h1>404</h1>
                                <h2>Page Not Found</h2>
                                </Col>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </UserContextProvider>
  );
}

export default App;
