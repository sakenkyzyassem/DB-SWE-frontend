import React from "react";
import {Row, Form, Col, ButtonGroup, Button, Alert} from "react-bootstrap";
import {sendMssg} from "../../../services/managerServices";

export default class ManageEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            receiver: "",
            text: "",
            price: -1,
            error: false
        }
    }

    sendEmail = (event) => {
        event.preventDefault();
        let email = {
            title: this.state.title,
            price: this.state.price,
            message: this.state.text
        }
        if(email.title === "" || email.price === -1 || email.message === "" ){
            this.setState({error: true});

        }
        else {
            sendMssg(email)
                .then(res => {
                    this.setState({error: false, title: "", price: -1,receiver: "", text: ""});
                })
        }
    }

    render() {
        return (
            <Row className="p-5">
                <Alert
                    show={this.state.error}
                    onClose={() => this.setState({error: false})}
                    variant="danger"
                    dismissible
                >
                    Please, fill in all fields
                </Alert>
                <Form as={Col} xs={12}  onSubmit={this.sendEmail}>
                    <Form.Group controlId="emailFormtitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={this.state.title}
                            type="text"
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="emailFormReceiver">
                        <ButtonGroup className="mb-2">
                            <Button
                                type="button"
                                className={this.state.receiver === "guest" ? "btn-grp-active" : "btn-grp-nonactive"}
                                onClick={() => this.setState({receiver: "guest"})}
                            >Send Guests</Button>
                            <Button
                                type="button"
                                className={this.state.receiver === "employee" ? "btn-grp-active" : "btn-grp-nonactive"}
                                onClick={() => this.setState({receiver: "employee", price: 0})}
                            >Send Employees</Button>
                        </ButtonGroup>
                        {
                            this.state.receiver === "guest"
                            ?
                                <div>
                                    <Form.Label>Guest Payment Status</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={(e) => this.setState({price: e.target.value})}
                                    />
                                </div>
                            : null
                        }
                    </Form.Group>
                    <Form.Group controlId="emailFormText">
                        <Form.Label>Email content</Form.Label>
                        <Form.Control
                            value={this.state.text}
                            as="textarea"
                            rows={3}
                            onChange={(e) => this.setState({text: e.target.value})}
                        />
                    </Form.Group>
                    <Button type="submit" onClick={(e) => this.sendEmail(e)}>Send</Button>
                </Form>
            </Row>
        )
    }
}