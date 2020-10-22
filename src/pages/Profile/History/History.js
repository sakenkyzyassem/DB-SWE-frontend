import React from "react";
import {Table, Badge, Spinner, Row, Button, Modal, Form, Col} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getUserBookings, deleteBooking, editBooking } from "../../../services/bookingsService";
import './History.scss'

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            userHistory: null,
            isLoading: false,
            newBookings: null
        }
    }

     componentDidMount() {
        getUserBookings(this.props.data)
            .then((res) => this.setState({userHistory: res}));
    }

    createBooking = () => {
        this.props.history.push("/");
    }

    handleHide = (id, key) => {
        this.setState({isLoading: true});
        console.log("deleting "+id);
        deleteBooking(id)
            .then(res => {
                console.log(res);
                    const arr = [...this.state.userHistory];
                    arr.splice(key,1);
                    this.setState({userHistory: arr});
                    console.log(arr);
            })

        this.setState({isLoading: false});
    }

    handleEdit = (e, key) => {
        e.preventDefault();
        var bookings = this.state.newBookings;

        editBooking(bookings[key].booking_id, bookings[key]);

        this.setState({
            userHistory: this.state.newBookings,
            newBookings: null,
            show: false
        });
    }

    handleChange = (event, key, name) => {
        if( this.state.newBookings ) {
            var booking = {
                ...this.state.newBookings[key],
                [name]: event.target.value
            };
            console.log(booking);
            var bookings = [...this.state.newBookings];
        }
        else {
            var booking = {
                ...this.state.userHistory[key],
                [name]: event.target.value
            };
            console.log(booking);
            var bookings = [...this.state.userHistory]
        }
        bookings[key] = booking;

        this.setState({ newBookings: bookings});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleOpen = () => {
        this.setState({show: true});
    }

    handleCancel = (id, key) => {
        var booking = this.state.userHistory[key];
        booking.appointment_status = "canceled";

        editBooking(id, booking)
            .then(res => {
                const arr = [...this.state.userHistory];
                arr[key].appointment_status = "canceled";
                this.setState({userHistory: arr});
                console.log(arr);
            })
    }

    render() {
        return (
            this.state.userHistory ?
                (Array.isArray(this.state.userHistory) && this.state.userHistory.length !== 0)
                    ?
                    <div>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Room type</th>
                                <th>Date of reservation</th>
                                <th>Due date</th>
                                <th>Number of rooms</th>
                                <th>Payment Status</th>
                                <th>Appointment status</th>
                                <th><Button variant="primary" onClick={this.createBooking} block>Book</Button></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.userHistory.map((row, index) => {
                                    if (row.appointment_status === "canceled"){
                                        return (
                                            <tr key={index}>
                                                <td>{row.room_type}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.payment_status}</td>
                                                <td><Badge variant="danger">Canceled</Badge></td>
                                                <td>
                                                    <Button
                                                        variant="outline-info"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.handleHide(row.booking_id, index)
                                                        }}
                                                        disabled={this.state.isLoading}
                                                        block
                                                    >
                                                        { this.state.isLoading ? "...Loading" : "Hide"}
                                                    </Button></td>
                                            </tr>
                                        )
                                    }
                                    else if (row.appointment_status === "pending"){
                                        return (
                                            <tr key={index}>
                                                <td>{row.room_type}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.payment_status}</td>
                                                <td><Badge variant="warning">Pending</Badge></td>
                                                <td>
                                                    <Button
                                                        variant="outline-additional"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.handleOpen()
                                                        }}
                                                        className="m-1"
                                                        disabled={this.state.isLoading}
                                                        block
                                                    >
                                                        { this.state.isLoading ? "...Loading" : "Edit"}
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.handleCancel(row.booking_id, index)
                                                        }}
                                                        className="m-1"
                                                        disabled={this.state.isLoading}
                                                        block
                                                    >
                                                        { this.state.isLoading ? "...Loading" : "Cancel"}
                                                    </Button>
                                                </td>
                                                <Modal show={this.state.show} onHide={this.handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit form</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form onSubmit={(e) => this.handleEdit(e, index)}>
                                                            <Form.Group as={Row} controlId="roomTypeControl">
                                                                <Form.Label column sm="3">
                                                                    Room Type
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control
                                                                        as="select"
                                                                        defaultValue={row.room_type}
                                                                        onChange={(e) => this.handleChange(e, index, "room_type")}
                                                                    >
                                                                        <option value="single">Single</option>
                                                                        <option value="double">Double</option>
                                                                        <option value="family">Family</option>
                                                                        <option value="king">King</option>
                                                                    </Form.Control>
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} controlId="dueDateControl">
                                                                <Form.Label column sm="3">
                                                                    Due date
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control
                                                                        type="date"
                                                                        defaultValue={row.due_date}
                                                                        onChange={(e) => this.handleChange(e, index, "due_date")}
                                                                    />
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} controlId="numberOfRoomsControl">
                                                                <Form.Label column sm="3">
                                                                    Number of rooms
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control
                                                                        type="number"
                                                                        defaultValue={row.number_of_rooms}
                                                                        onChange={(e) => this.handleChange(e, index, "number_of_rooms")}
                                                                    />
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} className="p-3">
                                                                <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="primary" type="submit" block>
                                                                    Save Changes
                                                                </Button>
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                </Modal>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tr key={index}>
                                                <td>{row.room_type}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.payment_status}</td>
                                                <td><Badge variant="success">Success</Badge></td>
                                                <td>
                                                    <Button
                                                        variant="outline-info"
                                                        size="sm"
                                                        onClick={() => {this.handleHide(row.booking_id, index)}}
                                                        disabled={this.state.isLoading}
                                                    >
                                                        { this.state.isLoading ? "...Loading" : "Hide"}
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                    :
                    <h5 className="label">You do not have bookings yet!</h5>
            :
                <Row className="justify-content-md-center">
                    <Spinner animation="border" role="status" variant="secondary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>
        );
    }
}

export default withRouter(History);