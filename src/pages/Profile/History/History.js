import React from "react";
import { Table, Badge } from 'react-bootstrap';
import './History.scss'

class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    type: 'single',
                    reservation_date: '12 October 2020',
                    due_date: '20 October 2020',
                    num_rooms: 2,
                    payment_status: '20,000',
                    app_status: <Badge variant="danger">Canceled</Badge>
                },
                {
                    type: 'double',
                    reservation_date: '9 October 2020',
                    due_date: '29 October 2020',
                    num_rooms: 1,
                    payment_status: '15,000',
                    app_status: <Badge variant="warning">Pending</Badge>
                },
                {
                    type: 'single',
                    reservation_date: '12 April 2019',
                    due_date: '20 October 2020',
                    num_rooms: 1,
                    payment_status: '30,000',
                    app_status: <Badge variant="success">Success</Badge>
                },
            ]
        }
    }

    render() {
        return (
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
                        this.state.data.map(row => {
                            return (
                            <tr>
                                <td>{row.type}</td>
                                <td>{row.reservation_date}</td>
                                <td>{row.due_date}</td>
                                <td>{row.num_rooms}</td>
                                <td>{row.payment_status}</td>
                                <td>{row.app_status}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default History;