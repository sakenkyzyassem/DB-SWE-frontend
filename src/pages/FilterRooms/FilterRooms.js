import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import './FilterRooms.scss';
import {filterRooms, getHotels} from "../../services/hotelServices";
import Filter from "../../components/filter/Filter";
import UserContext from "../../services/userContext";
import LoginModal from "../../components/LoginModal/LoginModal";
import BookingModal from "../../components/bookingForm/BookingModal";
import {getCategories} from "../../services/bookingsService";

class FilterRooms extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            showLogIn: false,
            places: [],
            hotels: [],
            data: null,
            booking: null,
            bookingDetails: null,
            confirmBooking: false,
            roomsByType: {},
            rooms: {},
            availableRooms: [],
            categories: [],
            userCategory: null
        }
    }

    componentDidMount() {
        getHotels().then(data => {
            this.setState({places: data});
        })
        if( this.props.history.location.data ){
            this.setState({
                hotels: Object.keys(this.props.history.location.data),
                data: this.props.history.location.data,
                bookingDetails: this.props.history.location.bookingDetails
            })
            this.getRoomNums(this.props.history.location.data);
            // add categories
        }
    }

    handleClick = (event, index) => {
        if( !this.context.isLoggedIn ){
            this.setState({showLogIn: true});
        }
        else {
            let roomtypeInfo = this.state.data[this.state.hotels[0]].roomTypeInfoList[index];
            let roomsNum = roomtypeInfo.howmanyavailable;
            if( this.state.rooms[index] !== undefined ) {
                roomsNum = this.state.rooms[index];
            }
            let booking = {
                hotelid: this.state.data[this.state.hotels[0]]["hotelEntity"].hotel_id,
                guestid: this.props.location.guestId ? this.props.location.guestId : this.context.user.userId,
                roomtype: roomtypeInfo.type,
                status: "pending",
                date_reservation: this.state.bookingDetails.start_date,
                due_date: this.state.bookingDetails.due_date,
                number_of_rooms: roomsNum,
                price: roomtypeInfo.price,
                category: this.state.userCategory,
                service_price: 0
            }
            this.setState({availableRooms: this.state.roomsByType[index]});
            this.setState({booking: booking});
            this.setState({confirmBooking: true});
        }
    }

    changeRoomNums = (e, index) => {
        this.setState({rooms: {
                ...this.state.rooms,
                [index]: e.target.value
            }});
        //console.log(this.state.rooms);
    }

    changeCategory = (e) => {
        this.setState({userCategory: e.target.value});
    }

    confirmBooking = (val) => {
        this.setState({confirmBooking: val });
    }

    filterRooms = (data) => {
        //console.log(data);
        filterRooms(data)
            .then(res => {
                this.setState({
                    data: res,
                    hotels: Object.keys(res),
                    bookingDetails: data
                });
                console.log(res);
                this.getRoomNums(res);
                // get categories
            });
    }

    getRoomNums = (data) => {
        getCategories(data[Object.keys(data)[0]].hotelEntity.hotel_id)
            .then(res => {
                this.setState({categories: res});
                //console.log(res);
            })

        let roomTypes = data[Object.keys(data)[0]].roomTypeInfoList;
        let resList = [];
        roomTypes.forEach(roomType => {
            resList.push(roomType.roomnums.substring(0, roomType.roomnums.length-1).split(" "));
        })
        this.setState({roomsByType: resList});
        //console.log(resList);
    }

    render() {
        return (
            <div className="FilteredRooms">
                <Container as={Col} className="p-5">
                    <LoginModal
                        title={"Login please"}
                        showLogIn={this.state.showLogIn}
                        message={"Please, sign in or sign up to make a reservation"}
                    />
                    {
                        this.state.data ?
                            <BookingModal
                                hotel = {this.state.data[this.state.hotels[0]]["hotelEntity"]}
                                confirmBooking={this.confirmBooking}
                                showModal = {this.state.confirmBooking}
                                booking={this.state.booking}
                                availableRooms={this.state.availableRooms}
                            />
                            :
                            null
                    }
                    <Row className="align-content-center mb-4">
                        <Filter
                            filter={this.filterRooms}
                            hotels={this.state.places}
                            className="filter"
                        />
                    </Row>
                    <Row>
                        {
                            this.state.data ?
                                this.state.data[this.state.hotels[0]].roomTypeInfoList.map((roomtype, i) => {
                                    return (
                                        <Card key={i} className="my-4 mx-auto shadow p-3 mb-5 bg-white rounded">
                                            <Card.Body as={Row}>
                                                <Col>
                                                    <Card.Img
                                                        src={require(`../../static/hotel-room-${i}.jpg`)}
                                                        style={{"maxWidth": "800px"}}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col>Hotel: </Col>
                                                        <Col>
                                                            <Link to={`/hotel/${this.state.data[this.state.hotels[0]]["hotelEntity"].hotel_id}`}>
                                                                {this.state.data[this.state.hotels[0]]["hotelEntity"].name}
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Room type:</Col>
                                                        <Col>{roomtype.type}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Room size:</Col>
                                                        <Col>{roomtype.size}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Capacity:</Col>
                                                        <Col>{roomtype.capacity}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Available:</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                className="my-1 mr-sm-2"
                                                                id="inlineFormCustomSelectPref"
                                                                custom
                                                                onChange={(e) => this.changeRoomNums(e, i)}
                                                            >
                                                                {
                                                                    Array.from(Array(roomtype.howmanyavailable).keys()).map(i => {
                                                                        return (
                                                                            <option key={i} value={roomtype.howmanyavailable-i}>
                                                                                {roomtype.howmanyavailable-i}
                                                                            </option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Choose your category:</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                className="my-1 mr-sm-2"
                                                                id="inlineFormCustomSelect"
                                                                custom
                                                                onChange={(e) => this.changeCategory(e)}
                                                            >
                                                                <option value={this.state.userCategory}>No category</option>
                                                                {
                                                                    this.state.categories ?
                                                                    this.state.categories.map((category, i)=> {
                                                                        return (
                                                                            <option key={i} value={category.category}>
                                                                                {category.category}
                                                                            </option>
                                                                        )
                                                                    })
                                                                        : null
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Price for one room:</Col>
                                                        <Col>{roomtype.price}</Col>
                                                    </Row>
                                                    <Button
                                                        as={Row}
                                                        variant="outline-dark"
                                                        className="mt-4 mx-2"
                                                        onClick={(event) => this.handleClick(event, i)}
                                                    >Book this room</Button>
                                                </Col>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                                :
                                <h4 className="mx-auto">
                                    No data available
                                </h4>
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(FilterRooms);