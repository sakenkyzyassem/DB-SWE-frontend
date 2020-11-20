import React from "react";
import './ManageHotel.scss';
import UserContext from "../../../services/userContext";
import {getHotel} from "../../../services/hotelServices";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Nav, Row, Tab, Tabs} from "react-bootstrap";
import ManageSeason from "./ManageSeason";
import ManageEmail from "./ManageEmail";
import GuestProfile from "../../DeskClerk/ManageBookings/GuestsPage/Profile/DeskClerkGuestProfile";
import BookingHistory from "../../DeskClerk/ManageBookings/GuestsPage/BookingHistory/DeskClerkGuestBookingHistory";

export default class ManageHotel extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            hotel: null,
            newSeason: {
                hotel_id: "",
                season_name: "",
                add_price: 0
            }
        }
    }

    componentDidMount() {
        let context = this.context;
        getHotel(context.user.hotel_id)
            .then(res => {
                this.setState({hotel: res});
            });
    }

    render() {
        return (
            <Container className="container hotel-manage m-auto">
                <Card className="card">
                    <Tabs className="tabs"
                          id="controlled-tab-example"
                    >
                        <Tab eventKey="seasons" title="Hotel Seasons" className="tab">
                            <ManageSeason />
                        </Tab>
                        <Tab eventKey="email" title="Advisories" className="tab">
                            <ManageEmail />
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
        )
    }
}