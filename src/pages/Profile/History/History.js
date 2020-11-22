import React from "react";
import {Table, Badge, Row, Button, Modal, Form, Col, Tooltip, OverlayTrigger, Alert} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import {getUserBookings, editBooking, deleteBooking, getRoomTypes} from "../../../services/bookingsService";
import './History.scss'
import Loading from "../../../components/Loading/Loading";

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            userHistory: null,
            newBooking: undefined,
            prevRoomType: null,
            roomTypes: [],
            roomtype: undefined,
            roomtype_ch: false,
            date_reservation: undefined,
            date_r_ch: false,
            due_date: undefined,
            due_d_ch: false,
            number_of_rooms: undefined,
            num_ch: false,
            alertMsg: false
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
                //console.log(bookings);
                this.setState({userHistory: bookings});
                let rt = [];
                bookings.forEach(res => {
                    getRoomTypes(res.hotelid)
                        .then(res => rt.push(res    ));
                })
                this.setState({roomTypes: rt});
                //console.log(rt);
                //console.log(this.state.roomTypes);
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
        var booking = this.state.userHistory[key];
        //console.log(booking);
        if( this.state.roomtype_ch ) {
            booking.roomtype = this.state.roomtype;
        }
        if( this.state.date_r_ch ) {
            booking.date_reservation = this.state.date_reservation;
        }
        if( this.state.due_d_ch ) {
            booking.due_date = this.state.due_date;
        }
        if( this.state.num_ch ) {
            booking.number_of_rooms = this.state.number_of_rooms;
        }
        //console.log(booking);
        editBooking(this.state.prevRoomType, booking)
            .then(res => {
                this.updateData();
                this.setState({
                    newBookings: null,
                    show: false
                });
            })
            .catch(err => {
                this.setState({alertMsg: true});
            })
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleOpen = () => {
        this.setState({show: true});
    }

    handleCancel = (index) => {
        var booking = this.state.userHistory[index];
        //console.log(booking);
        let deletingBooking = {
            bookingid: booking.bookingid
        };
        deleteBooking(deletingBooking)
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
                                    if (row.status.toLowerCase() === "canceled"){
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
                                    else if (row.status.toLowerCase() === "pending"){
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
                                                                        onChange={(e) => this.setState({
                                                                            roomtype: e.target.value,
                                                                            roomtype_ch: true,
                                                                            prevRoomType: row.roomtype
                                                                        })}
                                                                    >
                                                                        {
                                                                            this.state.roomTypes[index] ?
                                                                            this.state.roomTypes[index].map((hotelRoomType, i) => {
                                                                                return (
                                                                                    <option>{hotelRoomType.name}</option>
                                                                                )
                                                                            })
                                                                                : null
                                                                        }
                                                                    </Form.Control>
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} controlId="reservationDateControl">
                                                                <Form.Label column sm="3">
                                                                    Occupation date
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control
                                                                        type="date"
                                                                        defaultValue={row.date_reservation}
                                                                        onChange={(e) => this.setState({
                                                                            date_reservation: e.target.value,
                                                                            date_r_ch: true,
                                                                            prevRoomType: row.roomtype
                                                                        })}
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
                                                                        onChange={(e) => this.setState({
                                                                            due_date: e.target.value,
                                                                            due_d_ch: true,
                                                                            prevRoomType: row.roomtype
                                                                        }) }
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
                                                                        onChange={(e) => this.setState({
                                                                            number_of_rooms: e.target.value,
                                                                            num_ch: true,
                                                                            prevRoomType: row.roomtype
                                                                        })}
                                                                    />
                                                                </Col>
                                                            </Form.Group>

                                                            <Alert variant='danger' show={this.state.alertMsg}>
                                                                No rooms available. Please try looking for available rooms <Link to="/filterRooms">here</Link>
                                                            </Alert>

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
                                    else if (row.status.toLowerCase() === 'occupied' || row.status.toLowerCase() === 'confirmed' ){
                                        return (
                                            <tr key={index}>
                                                <td><Link to={`/hotel/${row.hotelid}`}>{row.hotelid}</Link></td>
                                                <td>{row.roomtype}</td>
                                                <td>{row.date_reservation}</td>
                                                <td>{row.due_date}</td>
                                                <td>{row.number_of_rooms}</td>
                                                <td>{row.price}</td>
                                                <td>{row.service_price}</td>
                                                <td><Badge variant="success">{row.status}</Badge></td>
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
                                    else {
                                        return ( null )
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