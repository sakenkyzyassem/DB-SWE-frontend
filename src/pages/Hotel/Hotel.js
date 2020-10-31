import React from "react";
import {Row, Spinner, Tab, Tabs, Container} from "react-bootstrap";
import { getHotel } from "../../services/hotelServices";
import Information from "../Hotel/Information/Information";
import './Hotel.scss';
import Services from "../Hotel/Services/Services";
import Footer from '../../components/footer/Footer';
import Loading from "../../components/Loading/Loading";

class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            name: ""
        }
        console.log(this.state);
    }

    componentDidMount() {
        getHotel(this.props.match.params.id)
            .then(res => {
                this.setState({name: res.hotel.name});
                this.setState({isLoaded: true});
                console.log(this.state.name);
            })
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="hotels">
                    <Container className="container">
                        <h1>{this.state.name}</h1>
                        <Tabs className="tabs"
                            id="controlled-tab-example"
                            >
                            <Tab eventKey="info" title="Information" className="tab">
                                <Information hotel_id={this.props.match.params.id}/>
                            </Tab>
                            <Tab eventKey="services" title="Services" className="tab">
                                <Services hotel_id={this.props.match.params.id}/>                          
                            </Tab>
                        </Tabs>
                    </Container>
                    <Footer />
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

export default Hotel;

