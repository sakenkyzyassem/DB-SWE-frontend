import React from "react";
import {getAllGuests} from "../../../../../services/deskClerkService";
import Loading from "../../../../../components/Loading/Loading";
// import "./DeskClerkGuest.scss";
import {Table, Badge, Row, Button, Modal, Form, Col} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import {getUserBookings} from "../../../../../services/bookingsService";
import { Container, Card, Nav, Tab, Tabs } from "react-bootstrap";

class BookingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            bookingHistory: {}
        }
        console.log(this.state);
    }

    componentDidMount() {
        getUserBookings(this.props.guest_id)
            .then((res) => {
                console.log(res);
                this.setState({bookingHistory: res})
            });
    }

    render() {
        // if( this.state.isLoaded ) {
            return (
                this.state.bookingHistory ?
                (Array.isArray(this.state.bookingHistory) && this.state.bookingHistory.length !== 0)
                    ?
                <div className="manageBookings">
                    <div style={{height:"50px"}}></div>
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
                                this.state.bookingHistory.map((row, index) => {
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
                <div style={{textAlign:"center"}}>
                    <div style={{height:"50px"}}></div>
                    <img className="imgDeskclerk" src={require(`../../../../../static/nobookings.svg`)} alt="deskclerk" style={{height:"130px", width:"130px"}}/>
                    <div style={{height:"50px"}}></div>
                    <h6>Guest doesn't have bookings yet!</h6>
                </div>
                :
                <Loading />
            )
    }
}

export default withRouter(BookingHistory);