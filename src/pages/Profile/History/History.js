import React from "react";
import { Table, Badge } from 'react-bootstrap';
import './History.scss'

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userHistory: null
        }
    }

    async componentDidMount() {

        await fetch('/api/bookinghistory/'+"random000@gmail.com", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then((res) => this.setState({userHistory: res}))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.userHistory)
        return (
            (Array.isArray(this.state.userHistory) && this.state.userHistory.length !== 0)
                ?
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Room type</th>
                            <th>Date of reservation</th>
                            <th>Due date</th>
                            <th>Number of rooms</th>
                            <th>Payment Status</th>
                            <th>Appointment status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.userHistory.map(row => {
                                if (row.appointment_status == "canceled"){
                                    return (
                                        <tr>
                                            <td>{row.room_type}</td>
                                            <td>{row.date_reservation}</td>
                                            <td>{row.due_date}</td>
                                            <td>{row.number_of_rooms}</td>
                                            <td>{row.payment_status}</td>
                                            <td><Badge variant="danger">Canceled</Badge></td>
                                        </tr>
                                    )
                                }
                                else if (row.appointment_status == "pending"){
                                    return (
                                        <tr>
                                            <td>{row.room_type}</td>
                                            <td>{row.date_reservation}</td>
                                            <td>{row.due_date}</td>
                                            <td>{row.number_of_rooms}</td>
                                            <td>{row.payment_status}</td>
                                            <td><Badge variant="warning">Pending</Badge></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr>
                                            <td>{row.room_type}</td>
                                            <td>{row.date_reservation}</td>
                                            <td>{row.due_date}</td>
                                            <td>{row.number_of_rooms}</td>
                                            <td>{row.payment_status}</td>
                                            <td><Badge variant="success">Success</Badge></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </Table>
                :
                <h5 className="label">You do not have bookings yet!</h5>
        );
    }
}

export default History;