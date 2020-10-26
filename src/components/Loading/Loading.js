import React from "react";
import './Loading.scss';
import {Row, Spinner} from "react-bootstrap";

class Loading extends React.Component {

    render() {
        return (
            <Row className="loading-page">
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>
        )
    }
}

export default Loading;
