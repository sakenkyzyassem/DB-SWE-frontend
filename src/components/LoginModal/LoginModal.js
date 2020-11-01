import React from "react";
import { withRouter } from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

class LoginModal extends React.Component {

    handleSignIn = () => {
        this.props.history.push('/signIn');
    }

    handleSignUp = () => {
        this.props.history.push('/signUp');
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showLogIn}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login is required</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please, login or signup to see your profile and bookings history</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSignIn}>
                            SignIn
                        </Button>
                        <Button variant="primary" onClick={this.handleSignUp}>
                            SignUp
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(LoginModal);