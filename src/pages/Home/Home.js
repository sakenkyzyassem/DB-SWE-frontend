import React from "react";
import {Col, Row, Form, Button, Container} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { getHotels } from "../../services/hotelServices";

import './Home.scss';
import ImageTransition from "../../components/ImageTransition/ImageTransition";
import Loading from "../../components/Loading/Loading";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            filterData: {
                startDate: null,
                endDate: null,
            },
            startDate: null,
            endDate: null,
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

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        if( this.state.filterData.startDate !== null ) {
            let f = {
                ...this.state.filterData,
                startDate: this.convertDate(this.state.filterData.startDate),
                endDate: this.convertDate(this.state.filterData.endDate)
            }
            console.log(f);
        }
        console.log(this.state.filterData);
    }

    handleChange = (title, data) => {
        let newFilter = {
            ...this.state.filterData,
            [title]: data
        }

        this.setState({ filterData: newFilter });
    }

    convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
    }

    setEndDate = (date) => {
        this.handleChange("endDate", date);
    }

    setStartDate = (date) => {
        this.handleChange("startDate", date);
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row className="search-filter justify-content-center my-auto mx-5">
                            <Col md={9}>
                                <Row className="filter-forms">
                                    <Form.Group as={Col} xs={3} controlId="formGridPlace">
                                        <Form.Control as={"select"} size="lg" type="text" onChange={(event) => this.handleChange("city", event.target.value)}>
                                            <option value={null}>City</option>
                                            {
                                                this.state.hotels.map((hotel, i) => {
                                                    return(
                                                        <option key={i} value={hotel.id}>{hotel.city+', '+hotel.country}</option>
                                                    );
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} xs={6} controlId="formGridDate">
                                        <DateRangePicker
                                            startDate={this.state.filterData.startDate}
                                            endDate={this.state.filterData.endDate}
                                            onStartDateChange={this.setStartDate}
                                            onEndDateChange={this.setEndDate}
                                            minimumDate={new Date()}
                                            minimumLength={1}
                                            format='dd MMM yyyy'
                                            locale={enGB}
                                        >
                                            {({ startDateInputProps, endDateInputProps, focus }) => (
                                                <div className='row date-range'>
                                                    <input
                                                        className={'col input' + (focus === START_DATE ? ' -focused' : '')}
                                                        {...startDateInputProps}
                                                        placeholder='Start date'
                                                    />
                                                    <span className='date-range_arrow' />
                                                    <input
                                                        className={'col input' + (focus === END_DATE ? ' -focused' : '')}
                                                        {...endDateInputProps}
                                                        placeholder='End date'
                                                    />
                                                </div>
                                            )}
                                        </DateRangePicker>
                                    </Form.Group>

                                    <Form.Group as={Col} xs={3} controlId="formGridNumber" onChange={(event) => this.handleChange("number_of_people", event.target.value)}>
                                        <Form.Control size="lg" type="number" placeholder="# people"/>
                                    </Form.Group>
                                </Row>
                            </Col>

                            <Button md={3} className="filter-button ml-2 px-4" variant="secondary" type="submit">
                                Search
                            </Button>
                        </Form.Row>
                    </Form>
                    <div className="cover-bg"></div>
                    <div className="home-content">
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Popular Hotels</h1>
                                    <Row className="popular-hotels justify-content-center">
                                        {
                                            this.state.hotels.map((hotel, i) => {
                                                return (
                                                    <Col key={i} className="hotel-individual">
                                                        <Link to={`/hotel/${hotel.hotel_id}`}>
                                                            <ImageTransition
                                                                src={require(`../../static/hotel-${ i - Math.floor(i/4) + 1}.jpg`)}
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
                            </Row>
                        </Container>
                    </div>
                    }
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

export default Home;