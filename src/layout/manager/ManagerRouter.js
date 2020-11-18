import React from "react";
import {Link, Route, Redirect} from 'react-router-dom';

import UserContext from "../../services/userContext";
import ManagerProfile from "../../pages/Manager/Profile/ManagerProfile";
import ManagerMain from "../../pages/Manager/Main/ManagerMain";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import ManageEmployees from "../../pages/Manager/ManageEmployees/ManagerManageEmployees";
import EmployeesPage from "../../pages/Manager/ManageEmployees/EmployeesPage/ManagerEmployee";

export default class ManagerRouter extends React.Component {

    render() {
        return (
            <UserContext.Consumer>
                {state => {
                    if (!state.isLoggedIn || state.user.role !== 'MANAGER') {
                        return (
                            <Redirect to="/auth/employee" />
                        )
                    } else {
                        return (
                            <div>
                                <Route path='/manager/main'>
                                    <Header className="row" dark="true"/>
                                    <ManagerMain/>
                                    <Footer/>
                                </Route>
                                <Route path='/manager/profile'>
                                    <ManagerProfile/>
                                </Route>
                                <Route path='/manager/manageEmployees'>
                                    <Header className="row" dark="false"/>
                                    <div style={{height: "100px"}}></div>
                                    <ManageEmployees/>
                                    <Footer/>
                                </Route>
                                <Route path="/manager/employee/:id" component={EmployeesPage}/>
                                <Route path='/manager/:'>
                                    <p className="p-5">No such route found <br/>
                                        <Link to="/">GO HOME</Link>
                                    </p>
                                </Route>
                            </div>
                        )
                    }
                }
                }
            </UserContext.Consumer>
        );
    }
}