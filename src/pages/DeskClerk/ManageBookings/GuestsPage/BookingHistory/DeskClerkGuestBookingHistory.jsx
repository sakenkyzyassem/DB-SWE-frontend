import React from "react";
import Loading from "../../../../../components/Loading/Loading";
import "./DeskClerkGuestBookingHistory.scss";
import {Table, Badge, Row, Button, Modal, Form, Col, Tab, Tabs} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import {getUserBookings} from "../../../../../services/bookingsService";
import {changeBookingStatus, cancelBooking, changeBooking, changeRoom, filterByRoomType} from "../../../../../services/deskClerkService";

class BookingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            bookingHistory: {},
            show: false,
            status: '',
            numberRooms: null,
            roomType: '',
            dueDate: null,
            index: null,
            roomNumbers: []
        }
        this.statusHandler = this.statusHandler.bind(this);
        this.numberRoomsHandler = this.numberRoomsHandler.bind(this);
        this.roomTypeHandler = this.roomTypeHandler.bind(this);
        this.dueDateHandler = this.dueDateHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEdit2 = this.handleEdit2.bind(this);
        this.createBooking = this.createBooking.bind(this);
        this.handleEdit3 = this.handleEdit3.bind(this);
    }

    componentDidMount() {
        getUserBookings(this.props.guest_id)
            .then((res) => {
                console.log(res);
                this.setState({bookingHistory: res});
            });
    }

    statusHandler(e) {
        this.setState({status: e.target.value});
    }

    numberRoomsHandler(e) {
        this.setState({numberRooms: e.target.value});
    }

    roomTypeHandler(e) {
        console.log(this.state.roomType);
        this.setState({roomType: e.target.value});
    }

    dueDateHandler(e) {
        console.log(this.state.dueDate);
        this.setState({dueDate: e.target.value});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleOpen = (e, row, key) => {
        this.setState({index: key});
        this.setState({row: row});
        this.setState({show: true});
    }

    handleCancel = (e, id, key) => {
        e.preventDefault();
        var number_of_rooms = this.state.numberRooms;
        var roomtype = this.state.bookingHistory[key].roomtype;
        cancelBooking(id, roomtype, number_of_rooms)
            .then(res => {
                this.state.bookingHistory[key] = res;
                this.state.bookingHistory[key].status = 'canceled';
            })
    }

    handleEdit = (e, key) => {
        e.preventDefault();
        var booking = this.state.bookingHistory[key];
        booking.roomtype = this.state.roomType;
        booking.due_date = this.state.dueDate;
        changeBooking(booking)
            .then(res => {
                console.log(res)
                console.log(booking)
            })
    }

    handleEdit2 = (e, id, key) => {
        e.preventDefault();
        var status = this.state.status;
        var roomtype = this.state.bookingHistory[key].roomtype;
        changeBookingStatus(id, roomtype, status)
            .then(res => {
                this.state.bookingHistory[key] = res;
                console.log(this.state.bookingHistory[key])
                console.log(res)
            })
    }

    handleEdit3 = (e, id, key) => {
        e.preventDefault();
        var booking = this.state.bookingHistory[key];
        filterByRoomType(booking)
            .then(res => {
                console.log(res)
                this.setState({roomNumbers: res})
            })
            .then(changeRoom(id, this.state.roomNumbers[0])
            .then(res => {
                console.log(res);
            }))
    }

    createBooking = () => {
        this.props.history.push("/filterRooms");
    }

    render() {
            return (
                this.state.bookingHistory ?
                    (Array.isArray(this.state.bookingHistory) && this.state.bookingHistory.length !== 0)
                        ?
                        <div className="deskClerk">
                            <div style={{height:"50px"}}></div>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Hoteld</th>
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
                                        
                                            return (
                                                <tr key={index}>
                                                    <td><Link to={`/hotel/${row.hotelid}`}>{row.hotelid}</Link></td>
                                                    <td>{row.roomtype}</td>
                                                    <td>{row.date_reservation}</td>
                                                    <td>{row.due_date}</td>
                                                    <td>{row.number_of_rooms}</td>
                                                    <td>{row.payment_status}</td>
                                                    <td><Badge variant="warning">{row.status}</Badge></td>
                                                    <td>{row.price}</td>
                                                    <td>
                                                        <Button
                                                            variant="outline-additional"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                this.handleOpen(e, row, index)
                                                            }}
                                                            className="m-1"
                                                            block
                                                        >View</Button>
                                                    </td>
                                                    
                                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Edit Form</Modal.Title>
                                                        </Modal.Header>
                                                        
                                                        <Modal.Body>
                                                        <Tabs className="tabs" id="controlled-tab-example">
                                                            <Tab eventKey="changeBooking" title="Edit Booking" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit(e, this.state.index)}>
                                                                <Form.Group as={Row} controlId="roomTypeControl">
                                                                    <Form.Label column sm="3">
                                                                        Room Types
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            as="select"
                                                                            defaultValue={row.room_type}
                                                                            onChange={(e) => this.roomTypeHandler(e)}>
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
                                                                            onChange={(e) => this.dueDateHandler(e)}
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
    
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit(e, this.state.index)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                    <Button variant="primary"
                                                                        type="submit" block onClick={(e) => {this.handleEdit3(e, this.state.row.bookingid, this.state.index)}}>
                                                                        Change Room
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>
                                                            </Tab>
                                                            <Tab eventKey="changeBookingStatus" title="Change Status" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit2(e, this.state.row.bookingid, this.state.index)}>
                                                                <Form.Group as={Row} controlId="statusControl">
                                                                    <Form.Label column sm="3">
                                                                        Status
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            as="select"
                                                                            defaultValue={row.status}
                                                                            onChange={(e) => this.statusHandler(e)}>
                                                                            <option selected="true" disabled="disabled" value="chooseStatus">Choose status</option>
                                                                            <option value="occupied">Occupied</option>
                                                                            <option value="paid">Paid</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Group>
                                                                <div style={{height:"50px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit2(e, this.state.row.bookingid, this.state.index)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>                         
                                                            </Tab>
                                                            <Tab eventKey="cancelBooking" title="Cancel Booking" className="tab">
                                                                <div style={{height: "50px"}}></div>
                                                                    <Form onSubmit={(e) => this.handleCancel(e, this.state.row.bookingid, this.state.index)}>
                                                                        <Form.Group as={Row} controlId="numberOfRoomsControl">
                                                                            <Form.Label column sm="3">
                                                                                Number of rooms
                                                                            </Form.Label>
                                                                            <Col sm="8">
                                                                                <Form.Control
                                                                                    type="number"
                                                                                    defaultValue={row.number_of_rooms}
                                                                                    onChange={(e) => this.numberRoomsHandler(e)}
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <div style={{height:"30px"}}></div>
                                                                        <Form.Group as={Row} className="p-3">
                                                                            <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                                Close
                                                                            </Button>
                                                                            <Button variant="primary" type="submit" block onClick={(e) => {this.handleCancel(e, this.state.row.bookingid, this.state.index)}}>
                                                                                Cancel Booking
                                                                            </Button>
                                                                        </Form.Group>
                                                                    </Form>                         
                                                            </Tab>
                                                        </Tabs>
                                                            
                                                        </Modal.Body>
                                                    </Modal>
                                                </tr>
                                            )}
                                    )}
                                
                                </tbody>
                            </Table>
                        </div>
                        :
                        <div style={{textAlign:"center"}}>
                            <div style={{height:"50px"}}></div>
                            <img className="imgDeskclerk" src={require(`../../../../../static/nobookings.svg`)} alt="deskclerk" style={{height:"130px", width:"130px"}}/>
                            <div style={{height:"50px"}}></div>
                            <h6>Guest doesn't have bookings yet!</h6>
                            <button className="book" onClick={()=> {this.createBooking()}}>Book</button>
                        </div>
                :
                    <Loading />
            );
    }
}

export default withRouter(BookingHistory);