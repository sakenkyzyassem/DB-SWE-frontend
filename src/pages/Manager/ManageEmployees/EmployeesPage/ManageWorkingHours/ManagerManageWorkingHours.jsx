import React from "react";
import Loading from "../../../../../components/Loading/Loading";
import {Table,Row, Button, Modal, Form, Col, Tab, Tabs} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {getScheduleForAll, changePayroll, deleteSchedule, changeStartTime, changeEndTime, addSchedule} from "../../../../../services/managerServices";
import UserContext from "../../../../../services/userContext";

class ManageWorkingHours extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            manager: {}, 
            schedules: {},
            isLoaded: true,
            show: false,
            showAdd: false,
            payroll: null,
            startTime: null,
            endTime: null,
            date: null
        }
        this.payrollHandler = this.payrollHandler.bind(this);
        this.startTimeHandler = this.startTimeHandler.bind(this);
        this.endTimeHandler = this.endTimeHandler.bind(this);
        this.dateHandler = this.dateHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleOpen2 = this.handleOpen2.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEdit2 = this.handleEdit2.bind(this);
        this.handleEdit3 = this.handleEdit3.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        let context = this.context;
        this.state.manager = context.user;

        getScheduleForAll(this.state.manager.hotel_id)
            .then((res) => {
                this.setState({schedules:res[this.props.employee_id]});
                console.log(this.state.schedules);
            });
    }

    payrollHandler(e) {
        this.setState({payroll: e.target.value});
    }

    startTimeHandler(e) {
        this.setState({startTime: e.target.value});
    }

    endTimeHandler(e) {
        this.setState({endTime: e.target.value});
    }

    dateHandler(e) {
        this.setState({date: e.target.value});
    }

    handleClose = () => {
        this.setState({show: false});
        this.setState({showAdd: false});
    }

    handleOpen = (e) => {
        this.setState({show: true});
    }

    handleOpen2 = (e) => {
        this.setState({showAdd: true});
    }

    handleDelete = (e, date) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;

        deleteSchedule(hotel_id, emp_id, date)
            .then(res => {
                console.log(res);
            })
    }

    handleEdit = (e) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let new_pay = this.state.payroll;

        changePayroll(hotel_id, emp_id, new_pay)
            .then(res => {
                console.log("chnages");
                this.setState({schedules:res});
            });
    }

    handleEdit2 = (e) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules.date;
        let time = this.state.startTime;

        changeStartTime(hotel_id, emp_id, date, time)
            .then(res => {
                console.log("start time")
                console.log(res);
                this.setState({schedules: res});
            });
    }

    handleEdit3 = (e) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules.date;
        let time = this.state.endTime;

        changeEndTime(hotel_id, emp_id, date, time)
            .then(res => {
                console.log(res)
                this.setState({schedules: res})
            });
    }

    handleAdd = (e) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules.date;
        let starttime = this.state.startTime;
        let endtime = this.state.endTime;

        addSchedule(hotel_id, emp_id, date, starttime, endtime)
            .then(res => {
                console.log(res)
            });
    }

    render() {
            return (
                        <div className="manager">
                            <div style={{height:"50px"}}></div>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start time</th>
                                    <th>End time</th>
                                    <th>Payment per hour</th>
                                    <th>
                                        <Button variant="primary" size="sm"
                                            onClick={(e) => {
                                                this.handleOpen2(e)
                                            }} className="m-1" block>Add</Button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.schedules.date}</td>
                                        <td>{this.state.schedules.starttime}</td>
                                        <td>{this.state.schedules.endtime}</td>
                                        <td>{this.state.schedules.paymentperhour}</td>
                                        <td><Button variant="outline-additional" size="sm"
                                            onClick={(e) => {
                                                this.handleOpen(e)
                                            }} className="m-1" block>Change</Button>
                                            <Button variant="outline-info" size="sm"
                                            onClick={(e) => {
                                                this.handleDelete(e, this.state.schedules.date)
                                            }} className="m-1" block>Delete</Button>
                                        </td>
                                             
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Form</Modal.Title>
                                            </Modal.Header>
                                                        
                                            <Modal.Body>
                                                <Tabs className="tabs" id="controlled-tab-example">
                                                    <Tab eventKey="changePayroll" title="Change Payroll" className="tab">
                                                        <div style={{height: "50px"}}></div>
                                                        <Form onSubmit={(e) => this.handleEdit(e)}>
                                                            <Form.Group as={Row} controlId="payrollControl">
                                                                <Form.Label column sm="3">
                                                                    Payment per hour
                                                                </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            type="number"
                                                                            defaultValue={this.state.schedules.paymentperhour}
                                                                            onChange={(e) => this.payrollHandler(e)}
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
    
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit(e)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>
                                                            </Tab>
                                                            <Tab eventKey="changeStartTime" title="Change Start Time" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit2(e)}>
                                                                <Form.Group as={Row} controlId="startTimeControl">
                                                                    <Form.Label column sm="3">
                                                                        Start time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <form action="/action_page.php" onChange={(e) => this.startTimeHandler(e)}>
                                                                            <input type="time" id="appt" name="appt"/>
                                                                        </form>
                                                                    </Col>
                                                                </Form.Group>
                                                                <div style={{height:"50px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit2(e)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>                         
                                                            </Tab>
                                                            <Tab eventKey="changeEndTime" title="Change End Time" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit3(e)}>
                                                                <Form.Group as={Row} controlId="endTimeControl">
                                                                    <Form.Label column sm="3">
                                                                        End time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form action="/action_page.php" onChange={(e) => this.endTimeHandler(e)}>
                                                                        <input type="time" id="appt" name="appt"/>
                                                                    </form>
                                                                        {/* <Form.Control
                                                                            type="number"
                                                                            defaultValue={this.state.schedules.endtime}
                                                                            onChange={(e) => this.endTimeHandler(e)}
                                                                        /> */}
                                                                    </Col>
                                                                </Form.Group>
                                                                <div style={{height:"50px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit3(e)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>                         
                                                            </Tab>
                                                        </Tabs>
                                                            
                                                        </Modal.Body>
                                                    </Modal>

                                            <Modal show={this.state.showAdd} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Form</Modal.Title>
                                            </Modal.Header>
                                                        
                                            <Modal.Body>
                                                
                                                        <Form onSubmit={(e) => this.handleAdd(e)}>
                                                            <Form.Group as={Row} controlId="addDateControl">
                                                    
                                                                    <Form.Label column sm="3">
                                                                        Date
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form action="/action_page.php" onChange={(e) => this.dateHandler(e)}>
                                                                        <input type="time" id="appt" name="appt"/>
                                                                    </form>
                                                                    </Col>
                                                            </Form.Group>      
                                                            <Form.Group as={Row} controlId="addStartTimeControl">
                                                    
                                                                    <Form.Label column sm="3">
                                                                        Start time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form action="/action_page.php" onChange={(e) => this.startTimeHandler(e)}>
                                                                        <input type="time" id="appt" name="appt"/>
                                                                    </form>
                                                                    </Col>
                                                            </Form.Group>     
                                                            <Form.Group as={Row} controlId="addEndTimeControl">
                                                    
                                                                    <Form.Label column sm="3">
                                                                        End time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form action="/action_page.php" onChange={(e) => this.endTimeHandler(e)}>
                                                                        <input type="time" id="appt" name="appt"/>
                                                                    </form>
                                                                    </Col>
                                                            </Form.Group>         
    
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleAdd(e)}}>
                                                                        Add Schedule
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>
                                    
                                            </Modal.Body>
                                            </Modal>
                                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        
            );
    }
}

export default withRouter(ManageWorkingHours);