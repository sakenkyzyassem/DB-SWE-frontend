import React from "react";
import { Col, Row, Container } from 'react-bootstrap';
import './Profile.scss';
import UserContext from "../../../services/userContext";


class Profile extends React.Component {
    static contextType = UserContext;

    componentDidMount() {
        console.log(this.context);
    }

    render() {
        return (
            <Container className="col px-6">
                {/*<h2 className="pl-2" >{this.props.user.firstName | "" + " " + this.props.user.lastName}</h2>*/}
                <Row className="p-4">
                    <Col xs={6}>
                        <h6 className="info-header">General Information</h6>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;