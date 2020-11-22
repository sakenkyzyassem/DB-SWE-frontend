import React from "react";
import {Table, Badge, Row, Button, Modal, Form, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { getUserBookings, editBooking } from "../../../services/bookingsService";
import './History.scss'
import Loading from "../../../components/Loading/Loading";

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            userHistory: null,
            newBooking: null,
            prevRoomType: null,
        }
    }

     componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        getUserBookings(this.props.userId)
            .then((res) => {
                let bookings = [...res];
                if( Array.isArray(bookings) ) {
                    bookings.forEach(booking => {
                        booking.due_date = this.convertDate(booking.due_date);
                        booking.date_reservation = this.convertDate(booking.date_reservation);
                    })
                }
                console.log(bookings);
                this.setState({userHistory: bookings});
            })
    }

    convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
    }

    createBooking = () => {
        this.props.history.push("/filterRooms");
    }

    handleEdit = (e, key) => {
        e.preventDefault();
        var booking = this.state.newBooking;
        editBooking(this.state.prevRoomType, booking)
            .then(res => {
                this.updateData();
                this.setState({
                    newBookings: null,
                    show: false
                });
            })
    }

    handleChange = (event, key, name) => {
        var booking = {};
        if( this.state.newBookings != null ) {
            booking = {
                ...this.state.newBookings,
                [name]: event.target.value
            };
        }
        else {
            booking = {
                ...this.state.userHistory[key],
                [name]: event.target.value
            };
            this.setState({prevRoomType: this.state.userHistory[key].roomtype});
        }
        this.setState({ newBooking: booking });
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleOpen = () => {
        this.setState({show: true});
    }

    handleCancel = (index) => {
        var booking = this.state.userHistory[index];
        booking.status = "canceled";

        editBooking(booking.roomtype, booking)
            .then(res => {
                this.updateData();
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
                                <th>Hotel id</th>
                                <th>Room type</th>
                                <th>Date of occupation</th>
                                <th>Due date</th>
                                <th>Number of rooms</th>
                                <th>Estimated price</th>
                                <th>Services price</th>
                                <th>Reservation Status</th>
                                <th><Button variant="primary" onClick={this.createBooking} block>New booking</Button></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.userHistory.map((row, index) => {
                                    if (row.status === "canceled"){
                                        return (
                                            <tr key={index}>
                                                <td><Link to={`/hotel/${row.hotelid}`}>{row.hotelid}</Link></td>
                                                <td>{row.roomtype}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.price}</td>
                                                <td>{row.service_price}</td>
                                                <td><Badge variant="warning">Canceled</Badge></td>
                                                <td>
                                                    No action available
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else if (row.status === "pending"){
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={`/hotel/${row.hotelid}`}>
                                                        {row.hotelid}
                                                    </Link>
                                                </td>
                                                <td>{row.roomtype}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.price}</td>
                                                <td>{row.service_price}</td>
                                                <td><Badge variant="info">Pending</Badge></td>
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
                                                            this.handleCancel(index)
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
                                                                        defaultValue={row.roomtype}
                                                                        onChange={(e) => this.handleChange(e, index, "roomtype")}
                                                                    >
                                                                        <option value="old">Old</option>
                                                                        <option value="single">Single</option>
                                                                        <option value="double">Double</option>
                                                                        <option value="family">Family</option>
                                                                        <option value="king">King</option>
                                                                    </Form.Control>
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} controlId="dueDateControl">
                                                                <Form.Label column sm="3">
                                                                    Occupation date
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control
                                                                        type="date"
                                                                        defaultValue={row.date_reservation}
                                                                        onChange={(e) => this.handleChange(e, index, "date_reservation")}
                                                                    />
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
                                    else if (row.status === 'occupied' ){
                                        return (
                                            <tr key={index}>
                                                <td><Link to={`/hotel/${row.hotelid}`}>{row.hotelid}</Link></td>
                                                <td>{row.roomtype}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.price}</td>
                                                <td>{row.service_price}</td>
                                                <td><Badge variant="success">Occupied</Badge></td>
                                                <td>
                                                    <OverlayTrigger
                                                        key={'left'}
                                                        placement={'left'}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${'left'}`}>
                                                                Please refer to the desk clerk of your hotel if you want to change anything
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span className="d-inline-block">
                                                            <Button disabled style={{ pointerEvents: 'none' }}>
                                                              No actions available
                                                            </Button>
                                                        </span>
                                                    </OverlayTrigger>
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