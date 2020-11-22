import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import {getAllGuests} from "../../../services/deskClerkService";
import Loading from "../../../components/Loading/Loading";
import "./DeskClerkManageBookings.scss";
import {getUserBookings} from "../../../services/bookingsService";
import UserContext from "../../../services/userContext";

const ImageComponent = ({g}) => {
    if(g%7===0){
        return (
            <img
            src={require(`../../../static/guest-7.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else if(g%6===0){
        return (
            <img
            src={require(`../../../static/guest-6.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else if(g%5===0){
        return (
            <img
            src={require(`../../../static/guest-5.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else if(g%4===0){
        return (
            <img
            src={require(`../../../static/guest-4.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else if(g%3===0){
        return (
            <img
            src={require(`../../../static/guest-3.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else if(g%2===0){
        return (
            <img
            src={require(`../../../static/guest-2.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }else{
        return (
            <img
            src={require(`../../../static/guest-1.svg`)} 
            alt="guest"
            className="imgGuest"
            />
        )
    }
};

class ManageBookings extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            guests: [],
            guestsId:[],
            hotelId: null
        }
        console.log(this.state);
    }

    componentDidMount() {
        let context = this.context;
        this.setState({hotelId: context.hotel_id});
        getAllGuests()
            .then(res => {
                console.log(res)
                for (let i = 0; i < res.length; i++) {
                    this.setState({
                      guests: [
                        ...this.state.guests,
                        res[i].firstName+" "+res[i].lastName
                      ],
                      guestsId: [
                          ...this.state.guestsId,
                          res[i].userId
                      ],
                    })
                }
            },
            )
            console.log(this.state.guests)
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="manageBookings">
                    <Container className="container">
                        <h2>Manage Bookings</h2>
                        <input type="text" id="findGuest" class="findguest" onKeyUp="filteredSearch()" size="50" placeholder="Enter name and surname of the guest"></input>
                        <button class="search" type="button" >Search</button>
                        <div class="card" id="guestsList">
                            {this.state.guests.map((guest, i) => (
                                <Link to={`/deskClerk/guest/${this.state.guestsId[i]}`}>
                                <div className="guest" id="list">
                                <ImageComponent g={i}/>
                                    {guest}
                                </div>
                                </Link>
                            ))}
                        </div>
                    </Container>
                    <div className="back"></div>
                </div>
            )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

export default withRouter(ManageBookings);