import React from "react";
import { Col, Row } from "react-bootstrap";

import './Home.scss';

class Home extends React.Component {
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
                <div className="cover-bg"></div>
            </div>
        )
    }
}

export default Home;