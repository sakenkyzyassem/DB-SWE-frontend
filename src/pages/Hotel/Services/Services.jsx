import React from "react";
import { Carousel, Container} from "react-bootstrap";
import { getHotel } from "../../../services/hotelServices";
import './Services.scss';

class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            services: []
        }
    }

    componentDidMount() {
        getHotel(this.props.hotel_id)
            .then(res => {
                console.log(res)
                for (let i = 0; i < res.services.length; i++) {
                    this.setState({
                      services: [
                        ...this.state.services,
                        res.services[i].service
                      ],
                    })
                  }
                // console.log(this.state.features)
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
                                src={require('../../../static/service-1.jpg')}
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                className="d-block w-100"
                                src={require('../../../static/service-2.jpg')}
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={require('../../../static/service-4.jpg')}
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <br></br>
                        <hr></hr>
                        <h3>Services</h3>
                        <hr></hr>
                        <ul>
                            {this.state.services.map((service) => (
                                <li>{service}</li>
                            ))}
                        </ul>
                    </Container>
                </div>
            )
    }
}

export default Information;

