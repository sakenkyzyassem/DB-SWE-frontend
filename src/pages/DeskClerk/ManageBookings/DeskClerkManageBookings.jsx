import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import {getAllGuests, getHotelGuests} from "../../../services/deskClerkService";
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
            hotelId: null,
            hotelGuests: {}
        }
        console.log(this.state);
    }

    componentDidMount() {
        let context = this.context;
        this.setState({hotelId: context.hotel_id});
        getHotelGuests(context.user.hotel_id)
            .then(res => {
                console.log(res)
                this.setState({hotelGuests: res})
                console.log(this.state.hotelGuests)
                for(let g in Object.keys(this.state.hotelGuests)){
                    console.log(g)
                    this.state.guestsId.push(g)
                }
                for(let i in this.state.guestsId){
                    this.setState({
                        guests: [
                        ...this.state.guests,
                        this.state.hotelGuests[i].firstName+" "+this.state.hotelGuests[i].lastName
                    ],
                })
            }
            })
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
                            {this.state.guestsId.map((i) => (
                                <Link to={`/deskClerk/guest/${this.state.hotelGuests[i].userId}`}>
                                <div className="guest" id="list">
                                <ImageComponent g={i}/>
                                    {this.state.hotelGuests[i].firstName} {this.state.hotelGuests[i].lastName}
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