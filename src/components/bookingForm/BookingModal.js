import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { createBooking } from "../../services/bookingsService";
import {Link} from "react-router-dom";

class BookingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingTitles: {
                hotel_id: "Hotel",
                room_type: "Room type",
                date_reservation: "Reserve from",
                due_date: "Reserve to",
                number_of_rooms: "Number of rooms",
                price: "Price",
                status: null
            },
            success: false,
            error: false,
        }
    }

    handleConfirm = (event) => {
        event.preventDefault();
        console.log(this.props.booking);
        createBooking(this.props.booking)
            .then(response => response.json())
            .then(res => {
                this.setState({success: true});
                this.props.confirmBooking(false);
            })
            .catch(err => {
                this.setState({error: true});
                this.props.confirmBooking(false);
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
                                    return (
                                        <Row key={index}>
                                            <Col
                                                className="justify-content-end">{this.state.bookingTitles[detail]}</Col>
                                            <Col>{
                                                detail === 'hotel_id'
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