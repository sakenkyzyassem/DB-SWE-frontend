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
            date: null,
            keys:[],
            index: null
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
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
    }

    update(){
        let context = this.context;
        this.state.manager = context.user;

        getScheduleForAll(this.state.manager.hotel_id)
            .then((res) => {
                console.log(res)
                let j=0;
                for (var i in res) {
                    if(res[i].employee_id==this.props.employee_id){
                        this.state.schedules[j]=res[i];
                        j++;
                    }
                }
                console.log(this.state.schedules);
                
                for(let v in Object.keys(this.state.schedules)){
                    console.log(v)
                    console.log(this.state.schedules[v])
                    this.setState({
                        keys: [
                          ...this.state.keys,
                          v
                        ],
                    })
                }

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

    handleOpen = (e, index) => {
        this.setState({show: true});
        this.setState({index: index});
    }

    handleOpen2 = (e) => {
        this.setState({showAdd: true});
    }

    handleDelete = (e, index) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules[index].date;

        deleteSchedule(hotel_id, emp_id, date)
            .then(res => {
                console.log(res);
                this.setState({schedules: res});
                this.update();
            })
    }

    handleEdit = (e, index) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let new_pay = this.state.payroll;

        changePayroll(hotel_id, emp_id, new_pay)
            .then(res => {
                this.state.schedules[index] = res;
                // this.setState({schedules:res});
                this.update();
            });
    }

    handleEdit2 = (e, index) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules[index].date;
        let time = this.state.startTime;

        changeStartTime(hotel_id, emp_id, date, time)
            .then(res => {
                this.state.schedules[index] = res;
                // this.setState({schedules: res});
                this.update();
            });
    }

    handleEdit3 = (e, index) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.schedules[index].date;
        let time = this.state.endTime;

        changeEndTime(hotel_id, emp_id, date, time)
            .then(res => {
                console.log(res)
                this.state.schedules[index] = res;
                // this.setState({schedules: res})
                this.update();
            });
    }

    handleAdd = (e) => {
        e.preventDefault();
        let hotel_id = this.state.manager.hotel_id;
        let emp_id = this.props.employee_id;
        let date = this.state.date;
        let starttime = this.state.startTime;
        let endtime = this.state.endTime;
        var j = this.state.keys.length;

        addSchedule(hotel_id, emp_id, date, starttime, endtime)
            .then(res => {
                this.state.schedules[j]=res;
                this.update();
            });
    }

    render() {
            return (
                <UserContext.Consumer>
                    { state => {
                        if( state.isLoggedIn ) {
                            return (
                    (this.state.keys.length !== 0)
                        ?
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
                                {
                                    this.state.keys.map((index) => {
                                    return (
                                    <tr>
                                        <td>{this.state.schedules[index].date}</td>
                                        <td>{this.state.schedules[index].starttime}</td>
                                        <td>{this.state.schedules[index].endtime}</td>
                                        <td>{this.state.schedules[index].paymentperhour}</td>
                                        <td><Button variant="outline-additional" size="sm"
                                            onClick={(e) => {
                                                this.handleOpen(e, index)
                                            }} className="m-1" block>Change</Button>
                                            <Button variant="outline-info" size="sm"
                                            onClick={(e) => {
                                                this.handleDelete(e, index)
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
                                                        <Form onSubmit={(e) => this.handleEdit(e, this.state.index)}>
                                                            <Form.Group as={Row} controlId="payrollControl">
                                                                <Form.Label column sm="3">
                                                                    Payment per hour
                                                                </Form.Label>
                                                                    <Col sm="8">
                                                                        <Form.Control
                                                                            type="number"
                                                                            defaultValue={this.state.schedules[index].paymentperhour}
                                                                            onChange={(e) => this.payrollHandler(e)}
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
    
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit(e, this.state.index)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>
                                                            </Tab>
                                                            <Tab eventKey="changeStartTime" title="Change Start Time" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit2(e, this.state.index)}>
                                                                <Form.Group as={Row} controlId="startTimeControl">
                                                                    <Form.Label column sm="3">
                                                                        Start time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                        <form onChange={(e) => this.startTimeHandler(e)}>
                                                                            <input id="appt-time" type="time" name="appt-time" step="2"/>
                                                                        </form>
                                                                    </Col>
                                                                </Form.Group>
                                                                <div style={{height:"50px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit2(e, this.state.index)}}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Form.Group>
                                                            </Form>                         
                                                            </Tab>
                                                            <Tab eventKey="changeEndTime" title="Change End Time" className="tab">
                                                            <div style={{height: "50px"}}></div>
                                                            <Form onSubmit={(e) => this.handleEdit3(e, this.state.index)}>
                                                                <Form.Group as={Row} controlId="endTimeControl">
                                                                    <Form.Label column sm="3">
                                                                        End time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form onChange={(e) => this.endTimeHandler(e)}>
                                                                        <input id="appt-time" type="time" name="appt-time" step="2"/>
                                                                    </form>
                                                                    </Col>
                                                                </Form.Group>
                                                                <div style={{height:"50px"}}></div>
                                                                <Form.Group as={Row} className="p-3">
                                                                    <Button variant="outline-dark" type="cancel" onClick={this.handleClose} block>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" block onClick={(e) => {this.handleEdit3(e, this.state.index)}}>
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
                                                                    <form onChange={(e) => this.dateHandler(e)}>
                                                                        <input type="date" name="party" min="2020-11-23" max="2021-11-23"/>
                                                                    </form>
                                                                    </Col>
                                                            </Form.Group>      
                                                            <Form.Group as={Row} controlId="addStartTimeControl">
                                                    
                                                                    <Form.Label column sm="3">
                                                                        Start time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form onChange={(e) => this.startTimeHandler(e)}>
                                                                        <input id="appt-time" type="time" name="appt-time" step="2"/>
                                                                    </form>
                                                                    </Col>
                                                            </Form.Group>     
                                                            <Form.Group as={Row} controlId="addEndTimeControl">
                                                    
                                                                    <Form.Label column sm="3">
                                                                        End time
                                                                    </Form.Label>
                                                                    <Col sm="8">
                                                                    <form onChange={(e) => this.endTimeHandler(e)}>
                                                                        <input id="appt-time" type="time" name="appt-time" step="2"/>
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
                                     )}
                                )}
                                </tbody>
                            </Table>
                            </div>
                            :
                        <div style={{textAlign:"center"}}>
                            <div style={{height:"50px"}}></div>
                            <img className="imgDeskclerk" src={require(`../../../../../static/nobookings.svg`)} alt="deskclerk" style={{height:"130px", width:"130px"}}/>
                            <div style={{height:"50px"}}></div>
                            <h6>Employee doesn't have schedules yet!</h6>
                            <Button variant="primary" size="sm"
                                            onClick={(e) => {
                                                this.handleOpen2(e)
                                            }} className="m-1" block>Add</Button>
                        
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
                                                <form onChange={(e) => this.dateHandler(e)}>
                                                    <input type="date" name="party" min="2020-11-23" max="2021-11-23"/>
                                                </form>
                                                </Col>
                                        </Form.Group>      
                                        <Form.Group as={Row} controlId="addStartTimeControl">
                                
                                                <Form.Label column sm="3">
                                                    Start time
                                                </Form.Label>
                                                <Col sm="8">
                                                <form onChange={(e) => this.startTimeHandler(e)}>
                                                    <input id="appt-time" type="time" name="appt-time" step="2"/>
                                                </form>
                                                </Col>
                                        </Form.Group>     
                                        <Form.Group as={Row} controlId="addEndTimeControl">
                                
                                                <Form.Label column sm="3">
                                                    End time
                                                </Form.Label>
                                                <Col sm="8">
                                                <form onChange={(e) => this.endTimeHandler(e)}>
                                                    <input id="appt-time" type="time" name="appt-time" step="2"/>
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
                        </div>
            );
        }
        else {
            return (
                // <LoginModal
                //     title={"Login please"}
                //     showLogIn={!state.isLoggedIn}
                //     message={"Please, login or signup to see your profile and bookings history"}
                // />
                <p>ll</p>
                )
        }
    }
}
</UserContext.Consumer>
)
}
}

export default withRouter(ManageWorkingHours);