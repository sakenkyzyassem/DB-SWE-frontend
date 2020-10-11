import React from "react";
import {Card, Nav, Button} from "react-bootstrap";

import './Profile.scss';

class Profile extends React.Component {
    render() {
        return (
            <div className="col pa-4">
                <Card>
                    <Card.Header>
                        <Nav justify variant="tabs" defaultActiveKey="/profile">
                            <Nav.Item>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/history">Bookings</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Profile;