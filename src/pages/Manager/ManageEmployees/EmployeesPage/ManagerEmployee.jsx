import React from "react";
import Loading from "../../../../components/Loading/Loading";
import Header from "../../../../components/header/Header";
import "./ManagerEmployee.scss";
import { Container, Card, Tab, Tabs } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import Footer from "../../../../components/footer/Footer";
import EmployeeProfile from "../EmployeesPage/Profile/ManagerEmployeeProfile";
import ManagerWorkingHours from "../EmployeesPage/ManageWorkingHours/ManagerManageWorkingHours";

class EmployeesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            personal: {}
        }
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="managerPage">
                    <Header></Header>
                    <div style={{height:"100px"}}></div>
                    <Container className="container">
                    <Card className="card">
                    <Tabs className="tabs"
                            id="controlled-tab-example"
                            >
                        <Tab eventKey="info" title="Profile" className="tab">
                            <EmployeeProfile employee_id={this.props.match.params.id}/>
                        
                        </Tab>
                        <Tab eventKey="services" title="Working Schedule" className="tab">
                            <ManagerWorkingHours employee_id={this.props.match.params.id}/>                          
                        </Tab>
                    </Tabs>
                    </Card>
                    </Container>
                    <div className="back"></div>
                    <Footer/>
                </div>
                )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

export default withRouter(EmployeesPage);