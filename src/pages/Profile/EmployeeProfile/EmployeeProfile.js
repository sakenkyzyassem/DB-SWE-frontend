import React from "react";
import { Col, Row, Container, Card } from 'react-bootstrap';
import './EmployeeProfile.scss';
import UserContext from "../../../services/userContext";


class EmployeeProfile extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            employee: [],
        }
    }

    componentDidMount() {
        let context = this.context;
        this.setState({employee: context.user});
    }

    render() {
        return (
            <div className="myProfile" style={{textAlign:"center"}}>
                <Container className="container">
                    <h2>{this.state.employee.first_name + " "+ this.state.employee.last_name}</h2>
                    <Card className="card">
                        <img className="imgDeskclerk" src={require(`../../../static/deskclerk.svg`)} alt="deskclerk" style={{height:"200px"}}/>
                        <br></br>
                        <h6 className="info-header">General Information</h6>
                        <br></br>
                        <Row>
                            <Col md={3}>
                                <p>First Name</p>
                                <p>Last Name</p>
                                <p>Email</p>
                            </Col>
                            <Col>
                                <p>{this.state.employee.first_name}</p>
                                <p>{this.state.employee.last_name}</p>
                                <p>{this.state.employee.email}</p>
                            </Col>
                        </Row>
                    </Card>
                </Container>
                <div className="back"></div>
            </div>
        );
    }
}

export default EmployeeProfile;