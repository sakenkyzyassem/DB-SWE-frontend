import React from "react";
import { Col, Row, Container, Card } from 'react-bootstrap';
import './DeskClerkProfile.scss';
import Loading from "../../../components/Loading/Loading";

const col1 = [
    {
        label: "First Name",
        field: "firstName"
    },
    {
        label: "Last Name",
        field: "lastName"
    },
    {
        label: "Email",
        field: "email"
    }
]

class Profile extends React.Component {

    render() {
        return (
            <div className="ProfileMain">
            <Container className="col p-4">
                {
                    // this.props.user ?
                    <Card className="mt-5 shadow Card-profile">
                        <div>
                            <Row>
                                {/* <h2>{this.props.user.firstName + " " + this.props.user.lastName}</h2> */}
                            </Row>
                            <Row>
                                <Col xs={12} md={6} className="p-4">
                                    <h6 className="info-header">General Information</h6>
                                    {
                                        col1.map((field, index) => {
                                            return (
                                                <Row key={index} className="py-2">
                                                    <Col xs={6} className="label">
                                                        {field.label}
                                                    </Col>
                                                    <Col xs={6}>
                                                        {/* {this.props.user[field.field]} */}
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </div>
                        </Card>
                }
            </Container>
            </div>
        );
    }
}

export default Profile;