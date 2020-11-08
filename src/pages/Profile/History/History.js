import React from "react";
import {Table, Badge, Row, Button, Modal, Form, Col} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { getUserBookings, deleteBooking, editBooking } from "../../../services/bookingsService";
import './History.scss'
import Loading from "../../../components/Loading/Loading";

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            userHistory: null,
            newBookings: null
        }
    }

     componentDidMount() {
        getUserBookings(this.props.userId)
            .then((res) => this.setState({userHistory: res}));
    }

    createBooking = () => {
        this.props.history.push("/filterRooms");
    }

    handleHide = (id, key) => {
        deleteBooking(id)
            .then(res => {
                const arr = [...this.state.userHistory];
                arr.splice(key,1);
                this.setState({userHistory: arr});
            })
    }

    handleEdit = (e, key) => {
        e.preventDefault();
        var bookings = this.state.newBookings;

        editBooking(bookings[key].booking_id, bookings[key])
            .then(res => {
                this.setState({
                    userHistory: this.state.newBookings,
                    newBookings: null,
                    show: false
                });
            })
    }

    handleChange = (event, key, name) => {
        var booking = {};
        var bookings = {};
        if( this.state.newBookings != null ) {
            booking = {
                ...this.state.newBookings[key],
                [name]: event.target.value
            };
            bookings = [...this.state.newBookings];
        }
        else {
            booking = {
                ...this.state.userHistory[key],
                [name]: event.target.value
            };
            bookings = [...this.state.userHistory]
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
                                <th>Hotel</th>
                                <th>Room type</th>
                                <th>Date of reservation</th>
                                <th>Due date</th>
                                <th>Number of rooms</th>
                                <th>Payment Status</th>
                                <th>Reservation status</th>
                                <th>Estimated price</th>
                                <th><Button variant="primary" onClick={this.createBooking} block>Book</Button></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.userHistory.map((row, index) => {
                                    if (row.status === "canceled"){
                                        return (
                                            <tr key={index}>
                                                <td><Link to={`/hotel/${row.hotel_id}`}>row.hotel_id</Link></td>
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
                                                        block
                                                    >Remove</Button>
                                                </td>
                                                <td>{row.price}</td>
                                            </tr>
                                        )
                                    }
                                    else if (row.status === "pending"){
                                        return (
                                            <tr key={index}>
                                                <td><Link to={`/hotel/${row.hotel_id}`}>row.hotel_id</Link></td>
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
                                                        block
                                                    >Change</Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.handleCancel(row.booking_id, index)
                                                        }}
                                                        className="m-1"
                                                        block
                                                    >Cancel reservation</Button>
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
                                                <td><Link to={`/hotel/${row.hotel_id}`}>row.hotel_id</Link></td>
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
                                                    >Remove</Button>
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
                <Loading />
        );
    }
}

export default withRouter(History);