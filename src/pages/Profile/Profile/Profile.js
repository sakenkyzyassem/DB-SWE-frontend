import React from "react";
import axios from 'axios';
import { Col, Row, Card, Container } from 'react-bootstrap';
import './Profile.scss';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: ['Name', 'Surname', 'Username', 'Email']
        }
    }


    render() {
        return (
            <Container className="col px-6">
                <h2 className="pl-2" >{this.props.user.firstName + " " + this.props.user.lastName}</h2>
                <Row className="p-4">
                    <Col xs={9}>
                        <h6 className="info-header">General Information</h6>
                        <Row className="p-2">
                            <Col xs={4} className="label">{this.state.titles[0]}</Col>
                            <Col>{this.props.user.firstName}</Col>
                        </Row>
                        <Row className="p-2">
                            <Col xs={4} className="label">{this.state.titles[1]}</Col>
                            <Col>{this.props.user.lastName}</Col>
                        </Row>
                        <Row className="p-2">
                            <Col xs={4} className="label">{this.state.titles[3]}</Col>
                            <Col>{this.props.user.email}</Col>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <img src={this.props.user.profile} alt="user-profile-pic" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;