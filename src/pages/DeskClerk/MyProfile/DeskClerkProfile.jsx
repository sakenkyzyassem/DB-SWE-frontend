import React from "react";
import { Col, Row, Container, Card } from 'react-bootstrap';
import './DeskClerkProfile.scss';
import UserContext from "../../../services/userContext";


class DeskClerkProfile extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            deskClerk: [],
        }
    }

    componentDidMount() {
        let context = this.context;
        this.setState({deskClerk: context.user});
        console.log(this.state.deskClerk)
    }

    render() {
        return (
            <div className="myProfile" style={{textAlign:"center"}}>
                <Container className="container">
                    <h2>Desk Clerk</h2>
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
                            <p>{this.state.deskClerk.first_name}</p>
                            <p>{this.state.deskClerk.last_name}</p>
                            <p>{this.state.deskClerk.email}</p>
                        </Col>
                    </Row>
                    </Card>
                </Container>
                <div className="back"></div>
            </div>
        );
    }
}

export default DeskClerkProfile;