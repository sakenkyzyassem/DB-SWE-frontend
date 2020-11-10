import React from "react";
import Loading from "../../../../components/Loading/Loading";
import Header from "../../../../components/header/deskclerk/HeaderDeskClerk";
import "./DeskClerkGuest.scss";
import { Container, Card, Tab, Tabs } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import Footer from "../../../../components/footer/Footer";
import GuestProfile from "../GuestsPage/Profile/DeskClerkGuestProfile";
import BookingHistory from "../GuestsPage/BookingHistory/DeskClerkGuestBookingHistory";

class GuestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            personal: {}
        }
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="guestPage">
                    <Header></Header>
                    <div style={{height:"100px"}}></div>
                    <Container className="container">
                    <Card className="card">
                    <Tabs className="tabs"
                            id="controlled-tab-example"
                            >
                        <Tab eventKey="info" title="Profile" className="tab">
                            <GuestProfile guest_id={this.props.match.params.id}/>
                        </Tab>
                        <Tab eventKey="services" title="Booking History" className="tab">
                            <BookingHistory guest_id={this.props.match.params.id}/>                          
                        </Tab>
                    </Tabs>
                    </Card>
                    </Container>
                    <div className="back"></div>
                    <Footer/>
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

export default withRouter(GuestsPage);