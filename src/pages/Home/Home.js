import React from "react";
import {Col, Row, Container} from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import 'react-nice-dates/build/style.css'
import { getHotels } from "../../services/hotelServices";

import './Home.scss';
import ImageTransition from "../../components/ImageTransition/ImageTransition";
import Loading from "../../components/Loading/Loading";
import Filter from "../../components/filter/Filter";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({loaded: false});
        getHotels().then(data => {
            this.setState({hotels: data});
            this.setState({loaded: true});
        })
    }

    render() {
        if ( this.state.loaded ) {
            return (
                <div className="home">
                    <Row className="cover-page pt-5">
                        <Col xs={12} md={4}>
                            <img
                                src={require("../../static/cover.png")}
                                alt="people-illustration"
                            />
                        </Col>
                        <Col xs={12} md={{span: 7, offset: 1}} className="px-5 mt-5">
                            <h3><b>GETAROOM</b> is a hotel booking website, which will help you to find the perfect room
                            </h3>
                        </Col>
                    </Row>
                    <Filter className="filter" hotels={this.state.hotels}/>
                    <div className="cover-bg"></div>
                    <div className="home-content">
                        <Container>
                            <Row>
                                {
                                    this.state.hotels
                                        ?

                                        <Col>
                                            <h1>Popular Hotels</h1>
                                            <Row className="popular-hotels justify-content-center">
                                            {
                                                this.state.hotels.map((hotel, i) => {
                                                    return (
                                                        <Col key={i} className="hotel-individual">
                                                            <Link to={`/hotel/${hotel.hotel_id}`}>
                                                                <ImageTransition
                                                                    src={require(`../../static/hotel-${i + 1}.jpg`)}
                                                                    width="200px"
                                                                    height="150px"
                                                                    title={hotel.name}
                                                                    subtitle={hotel.city}
                                                                />
                                                            </Link>
                                                        </Col>
                                                    );
                                                })
                                            }
                                            </Row>
                                        </Col>
                                        :
                                        null
                                }
                            </Row>
                        </Container>
                    </div>
                
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

export default withRouter(Home);