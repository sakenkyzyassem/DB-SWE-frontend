import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import {addOccHist, createBooking} from "../../services/bookingsService";
import {Link} from "react-router-dom";

class BookingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingTitles: {
                hotelid: "Hotel",
                roomtype: "Room type",
                date_reservation: "Reserve from",
                due_date: "Reserve to",
                number_of_rooms: "Number of rooms",
                price: "Price",
                status: null,
                guestid: null,
                category: "Category",
                service_price: "Service price"
            },
            success: false,
            error: false,
        }
    }

    componentDidMount() {
        console.log(this.props.booking);
    }

    handleConfirm = (event) => {
        event.preventDefault();

        createBooking(this.props.booking)
            .then(response => response.json())
            .then(res => {
                if( res.status === 500 ) {
                    this.setState({error: true});
                }
                else {
                    Array.from(new Array(this.props.booking.number_of_rooms).keys()).forEach((room, i) => {
                        let histBooking = {
                            hotel_id: this.props.booking.hotelid,
                            guest_id: this.props.booking.guestid,
                            bookingid: res.bookingid,
                            room_type: this.props.booking.roomtype,
                            from_date: this.props.booking.date_reservation,
                            to_date: this.props.booking.due_date,
                            roomnumber: this.props.availableRooms[i]
                        }
                        addOccHist(histBooking)
                            .then(res => res.json())
                            .then(res => {
                                if( res.status === 500 ) {
                                    this.setState({error: true});
                                }
                                else {
                                    this.setState({success: true});
                                    this.props.confirmBooking(false);
                                }
                            })
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.error || this.state.success}
                >
                    <Modal.Header>
                        <strong className="mr-auto">Booking</strong>
                    </Modal.Header>
                    <Modal.Body>{
                        this.state.success
                            ? "Your booking was successfully saved"
                            : "There was some error. Try again later"
                    }</Modal.Body>
                    <Modal.Footer>
                        <Link to="/">Go HOME</Link>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.showModal}>
                    <Modal.Header>
                        <Modal.Title>Edit form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.props.booking ?
                            Object.keys(this.props.booking).map((detail, index) => {
                                if( this.state.bookingTitles[detail] !== null) {
                                    //console.log(detail);
                                    return (
                                        <Row key={index}>
                                            <Col
                                                className="justify-content-end">{this.state.bookingTitles[detail]}</Col>
                                            <Col>{
                                                detail === 'hotelid'
                                                    ? this.props.hotel.name
                                                    : this.props.booking[detail]
                                            }</Col>
                                        </Row>
                                    )
                                }
                                else {
                                    return ( null )
                                }
                            })
                                : null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleConfirm}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BookingModal;