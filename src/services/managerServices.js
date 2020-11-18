export const getAllEmployees = () => {
    return fetch(`/api/employee/getemployee`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getScheduleForAll = (hotel_id) => {
    return fetch(`/api/getscheduleforall/${hotel_id}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changePayroll = (hotel_id, emp_id, new_pay) => {
    return fetch(`/api/changepayroll/${hotel_id}/${emp_id}/${new_pay}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const deleteSchedule = (hotel_id, emp_id, date) => {
    return fetch(`/api/schedule/${hotel_id}/${emp_id}/${date}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeStartTime = (hotel_id, emp_id, date, time) => {
    return fetch(`/api/scheduleStart/${hotel_id}/${emp_id}/${date}/${time}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeEndTime = (hotel_id, emp_id, date, time) => {
    return fetch(`/api/scheduleEnd/${hotel_id}/${emp_id}/${date}/${time}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const addSchedule = (hotel_id, emp_id, date, starttime, endtime) => {
    return fetch(`/api/addschedule/${hotel_id}/${emp_id}/${date}/${starttime}/${endtime}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}