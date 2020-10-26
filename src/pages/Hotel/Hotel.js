import React from "react";
import {Row, Spinner} from "react-bootstrap";
import { getHotel } from "../../services/hotelServices";

import './Hotel.scss';
import Loading from "../../components/Loading/Loading";

class Hotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            hotel: null
        }
    }

    componentDidMount() {
        getHotel(this.props.match.params.id)
            .then(res => {
                this.setState({hotel: res});
                this.setState({isLoaded: true});
            })
    }

    render() {
        if( this.state.isLoaded ) {
            return (
                <div>
                    Hotel
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

