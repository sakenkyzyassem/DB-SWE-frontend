import React from "react";
import { Col, Row, Container } from 'react-bootstrap';
import './Profile.scss';
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
    },
    {
        label: "Document type",
        field: "documentType"
    },
    {
        label: "Document Id",
        field: "documentId"
    },
]

const col2 = [
    {
        label: "Mobile Phone Number",
        field: "mobile"
    },
    {
        label: "Home Phone Number",
        field: "home"
    },
    {
        label: "Address",
        field: "address"
    }
]

class Profile extends React.Component {

    render() {
        return (
            <Container className="col p-4">
                {
                    this.props.user ?
                        <div>
                            <Row>
                                <h2>{this.props.user.firstName + " " + this.props.user.lastName}</h2>
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
                                                        {this.props.user[field.field]}
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                                <Col xs={12} md={6} className="p-4">
                                    <h6 className="info-header">Contact Information</h6>
                                    {
                                        col2.map((field, index) => {
                                            return (
                                                <Row key={index} className="py-2">
                                                    <Col xs={6} className="label">
                                                        {field.label}
                                                    </Col>
                                                    <Col xs={6}>
                                                        {this.props.user[field.field]}
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </div>
                        :
                        <Loading />
                }
            </Container>
        );
    }
}

export default Profile;