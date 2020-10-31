import React from "react";
import {Row, Spinner, Tab, Tabs, Carousel, Container, Col} from "react-bootstrap";
import { getHotel, getHotelFeatures } from "../../../services/hotelServices";
import './Information.scss';
import Loading from "../../../components/Loading/Loading";
import { ConfirmationNumber, SignalCellularNullRounded } from "@material-ui/icons";

class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            address: "",
            city: "",
            country: "",
            features: [],
            phoneNumbers: []
        }
    }

    componentDidMount() {
        getHotel(this.props.hotel_id)
            .then(res => {
                this.setState({isLoaded: true});
                console.log(res.phone[0].phone_num)
                this.setState({address: res.hotel.address});
                this.setState({city: res.hotel.city});
                this.setState({country: res.hotel.country});
                for (let i = 0; i < res.phone.length; i++) {
                    this.setState({
                      phoneNumbers: [
                        ...this.state.phoneNumbers,
                        res.phone[i].phone_num
                      ],
                    })
                }
                  for (let i = 0; i < res.features.length; i++) {
                    this.setState({
                      features: [
                        ...this.state.features,
                        res.features[i].name
                      ],
                    })
                  }
                console.log(this.state.features)
            })
    }

    render() {
            return (
                <div className="information">
                    <Container>
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                className="d-block w-100"
                                src={require('../../../static/hotel-1.jpg')}
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                className="d-block w-100"
                                src={require('../../../static/hotel-2.jpg')}
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={require('../../../static/hotel-3.jpg')}
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <br></br>
                        <hr></hr>
                        <h3>Overview</h3>
                        <hr></hr>
                        <p>Riga has always acted as a meeting point between East and West. Riga’s 15th-century Old Town is a UNESCO World Heritage Site; its architectural treasures include medieval churches and the Riga Opera House.Amidst its cobblestone streets is the Grand Palace Hotel, which occupies a mansion that was built in the manner of a Russian tsar’s court. Its massive front doors lead to a lobby illuminated by crystal chandeliers. Subtle grandeur continues in the guest rooms, which feature a refined palette of pale blues and golds.</p>
                        <br></br>
                        <hr></hr>
                        <h3>Features</h3>
                        <hr></hr>
                        <ul>
                            {this.state.features.map((feature) => (
                                <li>{feature}</li>
                            ))}
                        </ul>
                        <br></br>
                        <hr></hr>
                        <h3>Contacts</h3>
                        <hr></hr>
                        <Row>
                            <Col>
                            <h5>Address</h5>
                            <p>{this.state.address}, {this.state.city}, {this.state.country}</p>
                            </Col>
                            <Col>
                                <h5>Phone numbers</h5>
                                <ul>
                                    {this.state.phoneNumbers.map((number) => (
                                        <li>{number}</li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
    }
}

export default Information;

