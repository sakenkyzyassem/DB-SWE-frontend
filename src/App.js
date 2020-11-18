import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Col } from 'react-bootstrap';
import './App.scss';
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import ProfileMain from "./pages/Profile/ProfileMain";
import UserContextProvider from './services/userContextProvider';
import Footer from "./components/footer/Footer";
import Hotel from "./pages/Hotel/Hotel";
import FilterRooms from "./pages/FilterRooms/FilterRooms";
import Auth from "./layout/auth/Auth";
import DeskClerkRouter from "./layout/desk-clerk/DeskClerkRouter";
import ManagerRouter from "./layout/manager/ManagerRouter";

function App(props) {

    return (
        <UserContextProvider>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/deskClerk/:path" component={DeskClerkRouter} />
                        <Route path="/manager/:path" component={ManagerRouter} />
                        <Route path="/auth/:path" component={Auth} />
                        <Route>
                            <Header className="row" dark="true"/>
                            <div className="App-content">
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                        <Footer />
                                    </Route>
                                    <Route path="/filterRooms" >
                                        <FilterRooms />
                                    </Route>
                                    <Route path="/hotel/:id" component={Hotel} />
                                    <Route path="/profile/:tab" component={ProfileMain} />
                                    <Route path="*">
                                        <Col>
                                            <h1>404</h1>
                                            <h2>Page Not Found</h2>
                                            <Link to="/">Go Home</Link>
                                        </Col>
                                    </Route>
                                </Switch>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </UserContextProvider>
  );
}

export default App;
