import React from "react";
import {getAllGuests} from "../../../../../services/deskClerkService";
import Loading from "../../../../../components/Loading/Loading";
import "./DeskClerkGuestProfile.scss";
import { Row, Col } from "react-bootstrap";
import {withRouter} from "react-router-dom";

class GuestProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            personal: {},
            index: 0
        }
        console.log(this.state);
    }

    componentDidMount() {
        getAllGuests()
            .then(res => {
                const index = res.findIndex(g=>g.userId===this.props.guest_id);
                this.setState({index: index});
                this.setState({personal: res[index]})
            })
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="guestProfile">
                    <div style={{height:"50px"}}></div>
                    <h6 className="info-header">Guest's General Information</h6>
                    <br></br>
                    <Row>
                        <Col md={3}>
                            <p>First Name</p>
                            <p>Last Name</p>
                            <p>Email</p>
                        </Col>
                        <Col>
                            <p>{this.state.personal.firstName}</p>
                            <p>{this.state.personal.lastName}</p>
                            <p>{this.state.personal.email}</p>
                        </Col>
                        <Col md={3}>
                            <img className="imgDeskclerk" src={require(`../../../../../static/guest-${this.state.index+1}.svg`)} alt="deskclerk" style={{height:"160px"}}/>
                        </Col>
                    </Row>
                    <h6 className="info-header">Guest's Contact Information</h6>
                    <br></br>
                    <Row>
                        <Col md={3}>
                            <p>Home Phone Number</p>
                            <p>Mobile Phone Number</p>
                            <p>{this.state.personal.documentType} Number</p>
                            <p>Address</p>
                        </Col>
                        <Col>
                            <p>{this.state.personal.home}</p>
                            <p>{this.state.personal.mobile}</p>
                            <p>{this.state.personal.documentId}</p>
                            <p>{this.state.personal.address}</p>
                        </Col>
                    </Row>
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

export default withRouter(GuestProfile);