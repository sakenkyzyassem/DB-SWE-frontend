import React from "react";
import {Col, Row, Form, Button, Container} from "react-bootstrap";
import { Link } from 'react-router-dom';

import './Home.scss';
import ImageTransition from "../../components/ImageTransition/ImageTransition";

class Home extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
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
                        <h3><b>GETAROOM</b> is a hotel booking website, which will help you to find the perfect room</h3>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row className="search-filter justify-content-center my-auto mx-5">
                        <Col md={9}>
                            <Row className="filter-forms">
                                <Form.Group as={Col} controlId="formGridPlace">
                                    <Form.Control size="lg" type="text" placeholder="Place" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Control size="lg" type="text" placeholder="Check-in/Check-out" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumber">
                                    <Form.Control size="lg" type="text" placeholder="Number of people" />
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
                                        Array(3).fill().map((_, i) => {
                                            return (
                                                <Col key={i} className="hotel-individual">
                                                    <Link to={`/hotel/${i}`}>
                                                        <ImageTransition
                                                            src={require(`../../static/hotel-${i+1}.jpg`)}
                                                            width="260px"
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
            </div>
        )
    }
}

export default Home;