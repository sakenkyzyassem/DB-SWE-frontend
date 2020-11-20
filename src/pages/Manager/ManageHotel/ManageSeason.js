import React from "react";
import './ManageHotel.scss';
import {Button, Col, Row, Table, Form, Alert} from "react-bootstrap";
import {addSeason, deleteSeason, getAllSeasons} from "../../../services/managerServices";
import UserContext from "../../../services/userContext";
import {getHotel} from "../../../services/hotelServices";
import Loading from "../../../components/Loading/Loading";

export default class ManageSeason extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state ={
            hotel: null,
            hotelSeasons: [],
            allSeasons: [],
            newSeason: "",
            newPrice: 0,
            error: false,
            loading: false
        }
    }

    async componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        let context = this.context;
        this.setState({loading: true});
        getHotel(context.user.hotel_id)
            .then(hotel => {
                this.setState({hotel: hotel});
                let hotelSeasons = [];
                hotel.seasons.forEach(s => hotelSeasons.push(s.season));
                this.setState({hotelSeasons: hotelSeasons});
                getAllSeasons(this.context.user.token)
                    .then(res => {
                        let hotelSeasons = this.state.hotelSeasons;
                        var allSeasons = res.filter(season => hotelSeasons.indexOf(season.name) === -1);
                        this.setState({allSeasons: allSeasons});
                        this.setState({loading: false});
                    });
            })
    }

    deleteSeason = (e, index) => {
        e.preventDefault();
        let season = this.state.hotel.seasons[index];
        deleteSeason(season.season, this.context.user.hotel_id, this.context.user.token)
            .then(res => {
                console.log(res);
                this.updateData();
            })
    }

    addSeason = (e) => {
        this.setState({error: false});
        e.preventDefault();
        let newSeason = {
            hotelid: this.state.hotel.hotel.hotel_id,
            season: this.state.newSeason,
            add_price: parseInt(this.state.newPrice)
        }
        if( newSeason.hotel_id !== 0 && newSeason.season_name !== "" && newSeason.add_price !== 0){
            addSeason(newSeason, this.context.user.token)
                .then(res =>{
                    this.updateData();
                })
        }
        else {
            this.setState({error: true});
        }
    }

    render() {
        return (
            <Row className="p-5">
                <Col sm={2}>
                    <img className="hotel" src={require('../../../static/hotel-key.png')} alt="hotelKey" />
                </Col>
                <Col sm={10}>
                    <h2>{this.state.hotel ? this.state.hotel.hotel.name : "Your workplace "}</h2>
                    <Row className="m-2">
                        <h5>Current Seasons:</h5>
                    </Row>
                    <Row className="m-2">
                        {
                            this.state.loading ?
                                <Loading />
                                :
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>Season Name</th>
                                        <th>Additional price</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.hotel ?
                                            this.state.hotel.seasons.map((season, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{season.season}</td>
                                                        <td>{season.add_price}</td>
                                                        <td>
                                                            <Button
                                                                block
                                                                variant="outline-secondary"
                                                                onClick={(event) => this.deleteSeason(event, key)}
                                                            >Remove
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                    <tr>
                                        <td>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Control
                                                    as="select"
                                                    defaultValue="Choose..."
                                                    onChange={e => this.setState({newSeason: e.target.value})}
                                                >
                                                    <option>Choose...</option>
                                                    {
                                                        this.state.allSeasons ?
                                                            this.state.allSeasons.map((season, i) => {
                                                                return (
                                                                    <option key={i}>
                                                                        {season.name}
                                                                    </option>
                                                                )
                                                            })
                                                            : null
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder="Additional price"
                                                onChange={e => this.setState({newPrice: e.target.value})}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                block
                                                type="button"
                                                variant="primary"
                                                onClick={(event) => this.addSeason(event)}
                                            >
                                                Add season
                                            </Button>
                                        </td>
                                    </tr>
                                    {
                                        this.state.error ?
                                            <tr>
                                                <td colSpan={4}>
                                                    <Alert show={this.state.error} variant="error">
                                                        <p>
                                                            Please, fill in fields
                                                        </p>
                                                    </Alert>
                                                </td>
                                            </tr>
                                            : null
                                    }
                                    </tbody>
                                </Table>
                        }
                    </Row>
                </Col>
            </Row>
        )
    }
}