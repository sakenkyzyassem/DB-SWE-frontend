import React from "react";
import Loading from "../../../../../components/Loading/Loading";
import "./DeskClerkGuestBookingHistory.scss";
import {Table, Badge, Row, Button, Modal, Form, Col, Tab, Tabs} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import {getUserBookings} from "../../../../../services/bookingsService";
import {changeBookingStatus, cancelBooking, changeBooking, changeRoom, filterByRoomType, addOccupation, getOccupationHistory, getRoomTypes} from "../../../../../services/deskClerkService";
import UserContext from "../../../../../services/userContext";

class BookingHistory extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            bookingHistory: {},
            show: false,
            status: '',
            numberRooms: null,
            roomType: '',
            roomNum: null,
            dueDate: null,
            index: null,
            roomNumbers: [],
            token: "",
            resDate: null,
            exists: '',
            active: false,
            occupationHistory: {},
            freeRooms: [],
            active2: true,
            exists2: '',
            changedOccupation: '',
            occupationKey: null,
            bookingNewOptions: {},
            roomTypes: [],
            types: [],
            prevRoom: null
        }
        this.statusHandler = this.statusHandler.bind(this);
        this.numberRoomsHandler = this.numberRoomsHandler.bind(this);
        this.roomTypeHandler = this.roomTypeHandler.bind(this);
        this.dueDateHandler = this.dueDateHandler.bind(this);
        this.resDateHandler = this.resDateHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEdit2 = this.handleEdit2.bind(this);
        this.createBooking = this.createBooking.bind(this);
        this.handleEdit3 = this.handleEdit3.bind(this);
        this.filteringRooms = this.filteringRooms.bind(this);
        this.update = this.update.bind(this);
        this.findOccupation = this.findOccupation.bind(this);
        this.filterToFindRoom = this.filterToFindRoom.bind(this);
    }

    componentDidMount() {
        let context = this.context;
        this.setState({token: context.user.token});
        console.log(this.state.token)
        getRoomTypes(context.user.hotel_id)
            .then(res => {
                for(let k in Object.keys(res)){

                    this.state.roomTypes.push(res[k].name)
                }
                console.log(this.state.roomTypes)
            })
        this.update();
    }

    update = () => {
        getUserBookings(this.props.guest_id)
            .then((res) => {
                console.log(res);
                this.setState({bookingHistory: res});
                this.setState({bookingNewOptions: res})
            });
    }

    statusHandler(e) {
        this.setState({status: e.target.value});
    }

    numberRoomsHandler(e) {
        this.setState({numberRooms: e.target.value});
    }

    roomTypeHandler(e) {
        this.setState({roomType: e.target.value});
    }

    dueDateHandler(e) {
        this.setState({dueDate: e.target.value});
    }

    resDateHandler(e) {
        this.setState({resDate: e.target.value})
    }

    handleClose = () => {
        this.setState({show: false});
        this.setState({active2:true});
    }

    handleOpen = (e, row, key) => {
        this.setState({index: key});
        this.setState({row: row});
        this.setState({show: true});
        this.setState({prevRoom: this.state.bookingHistory[key].roomtype})
        this.findOccupation(e, key);
    }

    handleCancel = (e, id, key) => {
        e.preventDefault();
        var number_of_rooms = this.state.numberRooms;
        console.log("cancel")
        var roomtype = this.state.bookingHistory[key].roomtype;
        cancelBooking(id, roomtype, number_of_rooms)
            .then(res => {
                let bookingH = {
                    ...this.state.bookingHistory
                }
                bookingH[key] = res;
                this.setState({bookingHistory: bookingH})
                this.setState({show: false})
                this.update();
            })
    }

    handleEdit = (e, key) => {
        e.preventDefault();
        var booking = this.state.bookingHistory[key];
        booking.prevroomtype = this.state.prevRoom;
        console.log("booking")
        console.log(booking)
        console.log("rromtype")
        booking.roomtype = this.state.roomType;
        booking.due_date = this.state.dueDate;
        booking.date_reservation = this.state.resDate;
        var token = this.state.token
        changeBooking(booking, token)
            .then(res => {
                let bookingH = {
                    ...this.state.bookingHistory
                }
                bookingH[key] = res;
                this.setState({bookingHistory: bookingH})
                console.log(res);
                console.log("done")
                this.setState({show: false})
                console.log(booking);
            })
        console.log("occ hist before change")
        console.log(this.state.occupationHistory);
        // var occupation = {
        //     bookingid: this.state.bookingHistory[key].bookingid,
        //     from_date: booking.date_reservation,
        //     guest_id: parseInt(this.props.guest_id),
        //     hotel_id: this.state.bookingHistory[key].hotelid,
        //     room_type: this.state.roomType,
        //     roomnumber: this.state.roomNumbers[0],
        //     to_date: booking.due_date
        // }
        // console.log("the add occ")
        // console.log(occupation)
        // addOccupation(occupation) 
        //     .then(res => {
        //         console.log(res);
        //         this.setState({show: false})
        //         this.update();
        //     })
    }

    handleEdit2 = (e, id, key) => {
        e.preventDefault();
        var status = this.state.status;
        var roomtype = this.state.bookingHistory[key].roomtype;
        changeBookingStatus(id, roomtype, status)
            .then(res => {
                let bookingH = {
                    ...this.state.bookingHistory
                }
                bookingH[key] = res;
                this.setState({bookingHistory: bookingH})
                console.log(this.state.bookingHistory[key])
                console.log(res)
                this.setState({show: false})
                this.update();
            })
    }

    handleEdit3 = (e, id, key) => {
        e.preventDefault();
        var roomtype = this.state.bookingHistory[key].roomtype;
        this.findOccupation(e,key);
        console.log(this.state.occupationHistory)
        console.log(this.state.occupationHistory[0])
        var index = 0;
        for(let k in Object.keys(this.state.occupationHistory)){
            if(this.state.occupationHistory[k].room_type==roomtype){
                index = k;
            }
        }
        var room_num = this.state.occupationHistory[index].roomnumber;
        this.filterToFindRoom(e, key);
        console.log("free room")
        console.log(this.state.freeRooms)
        if(this.state.freeRooms.length>0){
            changeRoom(id, roomtype, room_num)
                .then(res => {
                    this.setState({show: false})
                    console.log(res);
                })
            }
        else{
            this.setState({active2: false})
        }
    }

    filterToFindRoom = (e, key) => {
        e.preventDefault();
        var token = this.state.token
        var booking = this.state.bookingHistory[key];
        filterByRoomType(booking, token)
            .then(res => {
                console.log(res)
                this.setState({freeRooms: res})
            })
    }

    createBooking = () => {
        this.props.history.push("/filterRooms");
    }

    findOccupation = (e, key) => {
        console.log("hoo")
        let hotelid = this.state.bookingHistory[key].hotelid;
        let bookingid = this.state.bookingHistory[key].bookingid;
        getOccupationHistory(hotelid, bookingid)
            .then(res => {
                console.log(res)
                this.setState({occupationHistory: res})
                console.log("old occ")
                console.log(this.state.occupationHistory)
            })
    }

    filteringRooms = (e, key) => {
        e.preventDefault();
        console.log(this.state.bookingNewOptions)
        var booking = this.state.bookingNewOptions[key];
        console.log("in filter")
        console.log(booking)
        booking.roomtype = this.state.roomType;
        booking.due_date = this.state.dueDate;
        booking.date_reservation = this.state.resDate;
        var token = this.state.token
        console.log(booking)
        filterByRoomType(booking, token)
            .then(res => {
                console.log(res)
                this.setState({roomNumbers: res})
            })
            .then(res => {
                if(this.state.roomNumbers.length==0){
                    this.setState({exists: "There aren't any free rooms"})
                }else{
                    this.setState({exists: `There are free rooms`})
                }
            })
            .then(res =>{
                this.setState({active: true})
            }
            )
        console.log("after filter")
        console.log(this.state.bookingHistory)
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
                                                    <td><Badge variant="warning">{row.status}</Badge></td>
                                                    <td>{row.price}</td>
                                                    <td>
                                                        {row.number_of_rooms>0 ?
                                                        <Row>
                                                            <Col>
                                                            <Button
                                                                variant="outline-additional"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    this.handleOpen(e, row, index)
                                                                }}
                                                                className="m-1"
                                                                block
                                                            >View</Button>
                                                            </Col>
                                                            <Col>
                                                            
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        this.handleEdit3(e, row.bookingid, index)
                                                                    }}
                                                                    className="m-1"
                                                                    block
                                                                >Remove</Button>
                                                            </Col>
                                                        </Row>
                                                        : null}
                                                    </td>
                                                    
                                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Edit Form</Modal.Title>
                                                        </Modal.Header>
                                                        
                                                        <Modal.Body>
                                                        <Tabs className="tabs" id="controlled-tab-example">
                                                            <Tab eventKey="changeBooking" title="Edit Booking" className="tab" style={{minHeight:"400px"}}>
                                                            <div style={{height: "50px"}}></div>
                                                            <Form>
                                                                <Form.Group as={Row} controlId="roomTypeControl">
                                                                    <Form.Label column sm="3">
                                                                        Room Types
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            as="select"
                                                                            onChange={(e) => this.roomTypeHandler(e)}>
                                                                            {this.state.roomTypes.map((room) => (
                                                                                <option value={room}>{room}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} controlId="resDateControl">
                                                                    <Form.Label column sm="3">
                                                                        Reservation date
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            type="date"
                                                                            defaultValue={row.date_reservation}
                                                                            onChange={(e) => this.resDateHandler(e)}
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
                                                                            onChange={(e) => this.dueDateHandler(e)}
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} controlId="filterControl">
                                                                    <Col>
                                                                    <Button variant="outline-additional"
                                                                        size="sm"
                                                                        className="m-1"
                                                                        block
                                                                        style={{width:"100px"}}
                                                                        type="submit" onClick={(e) => {this.filteringRooms(e, this.state.index)}}>
                                                                        Find free rooms
                                                                    </Button>
                                                                    </Col>
                                                                    <Col>
                                                        <p>{this.state.exists}</p>
                                                        </Col>
                                                                </Form.Group>
    
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    {this.state.active && this.state.exists == `There are free rooms` ?
                                                                    <Button show={this.state.active} variant="primary" type="submit" block onClick={(e) => {this.handleEdit(e, this.state.index)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                    : null}
                                                                </Form.Group>
                                                            </Form>
                                                            </Tab>
                                                            <Tab eventKey="changeBookingStatus" title="Change Status or Room" className="tab" style={{minHeight:"400px"}}>
                                                            <div style={{height: "50px"}}></div>
                                                            <Form>
                                                                <Form.Group>
                                                                    {this.state.active2 ?
                                                                    <Button
                                                                        variant="outline-secondary"
                                                                        size="sm"
                                                                        style={{width:"100px"}}
                                                                        onClick={(e) => {
                                                                            this.handleEdit3(e, this.state.row.bookingid, this.state.index)
                                                                        }}
                                                                        className="m-1"
                                                                        block
                                                                    >Change Room</Button>
                                                                : <p>No free rooms</p>
                                                                }
                                                                    </Form.Group>
                                                                <div style={{height:"30px"}}></div>
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
                                                                <div style={{height:"20px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-additional"  size="sm"
                                                                        className="m-1"
                                                                        block
                                                                        style={{width:"100px"}} type="submit"    onClick={(e) => {this.handleEdit2(e, this.state.row.bookingid, this.state.index)}}>
                                                                        Change Status
                                                                    </Button>
                                                                </Form.Group>
                                                            
                                                            </Form>                         
                                                            </Tab>
                                                            {/* {this.state.row.number_of_rooms>1 ? */}
                                                            <Tab eventKey="cancelBooking" title="Cancel Booking" className="tab" style={{minHeight:"400px"}}>
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