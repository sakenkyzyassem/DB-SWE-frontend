import React from "react";
import { withRouter } from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

class LoginModal extends React.Component {

    handleSignIn = () => {
        if( this.props.route !== null ) {
            this.props.history.push(`/${this.props.route}/signIn`);
        }
        else {
            this.props.history.push('/auth/signIn');
        }
    }

    handleSignUp = () => {
        this.props.history.push('/auth/signUp');
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showLogIn}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSignIn}>
                            SignIn
                        </Button>
                        {
                            this.props.route
                            ?
                                null
                            : <Button variant="primary" onClick={this.handleSignUp}>
                                SignUp
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(LoginModal);