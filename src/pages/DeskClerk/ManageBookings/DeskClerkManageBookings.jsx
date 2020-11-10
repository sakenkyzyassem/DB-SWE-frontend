import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import {getAllGuests} from "../../../services/deskClerkService";
import Loading from "../../../components/Loading/Loading";
import "./DeskClerkManageBookings.scss";

class ManageBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            guests: [],
            guestsId:[]
        }
        console.log(this.state);
    }

    componentDidMount() {
        getAllGuests()
            .then(res => {
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
                            {this.state.guests.map((guest, i) => (
                                <Link to={`/deskClerk/guest/${this.state.guestsId[i]}`}>
                                <div className="guest" id="list">
                                    <img className="imgGuest" src={require(`../../../static/guest-${i+1}.svg`)} alt="guest"/>
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