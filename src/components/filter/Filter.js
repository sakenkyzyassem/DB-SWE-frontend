import React from "react";
import { withRouter } from 'react-router-dom';
import {Button, Col, Form, Row} from "react-bootstrap";
import {DateRangePicker, END_DATE, START_DATE} from "react-nice-dates";
import {enGB} from "date-fns/locale";
import {filterRooms} from "../../services/hotelServices";

import './Filter.scss';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterData: {
                start_date: null,
                due_date: null,
            },
            start_date: null,
            due_date: null,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let f = this.state.filterData;
        if( this.state.start_date !== null ) {
            f = {
                ...f,
                start_date: this.convertDate(this.state.start_date),
                due_date: this.convertDate(this.state.due_date)
            }
        }
        else {
            f = {
                ...f,
                start_date: this.convertDate(new Date()),
                due_date: ""
            }
        }

        if( this.props.filter ) {
            this.props.filter(f);
        }
        else {
            filterRooms(f)
                .then(res => {
                    this.props.history.push({
                        pathname: "/filterRooms",
                        data: res,
                        bookingDetails: f
                    });
                });
        }
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
        this.setState({due_date: date});
    }

    setStartDate = (date) => {
        this.setState({start_date: date});
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row className="search-filter justify-content-center my-auto mx-5">
                        <Col md={9}>
                            <Row className="filter-forms">
                                <Form.Group as={Col} xs={4} controlId="formGridPlace">
                                    <Form.Control as={"select"} size="lg" type="text" onChange={(event) => this.handleChange("city", event.target.value)}>
                                        <option value={null}>City</option>
                                        {
                                            this.props.hotels.map((hotel, i) => {
                                                return(
                                                    <option key={i} value={hotel.city}>{hotel.city}</option>
                                                );
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} xs={8} controlId="formGridDate">
                                    <DateRangePicker
                                        startDate={this.state.start_date}
                                        endDate={this.state.due_date}
                                        onStartDateChange={this.setStartDate}
                                        onEndDateChange={this.setEndDate}
                                        minimumDate={new Date()}
                                        minimumLength={1}
                                        format='yyyy-MM-dd'
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
                                                    placeholder='Due date'
                                                />
                                            </div>
                                        )}
                                    </DateRangePicker>
                                </Form.Group>
                            </Row>
                        </Col>

                        <Button md={3} className="filter-button ml-2 px-4" variant="secondary" type="submit">
                            Search
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default withRouter(Filter);