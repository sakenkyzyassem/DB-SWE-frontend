import React from "react";
import { Col, Row, Container, Card } from 'react-bootstrap';
import './DeskClerkProfile.scss';
import Loading from "../../../components/Loading/Loading";


class DeskClerkProfile extends React.Component {

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
                            <p>th</p>
                            <p>tgr</p>
                            <p>rtg</p>
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