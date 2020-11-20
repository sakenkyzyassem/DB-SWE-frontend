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

export const getAllSeasons = (token) => {
    return fetch('/api/manager/getallseasons',
        {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const addSeason = (season, token) => {
    return fetch('/api/manager/addseason',
        {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(season)
        })
        .then(res => res.text())          // convert to plain text
        .then(text => console.log(text))  // then log it out
        .catch(err => console.log(err));
}

export const deleteSeason = (season, hotel_id, token) => {
    return fetch(`/api/manager/deleteseason/${season}/${hotel_id}`,
        {
            method: 'DELETE',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const sendMssgToGuests = (mssg, id, token) => {
    return fetch(`/api/manager/sendemail/${id}`,
        {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mssg)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const sendMssgToEmployees = (mssg, id, token) => {
    return fetch(`/api/manager/emailtoemployees/${id}`,
        {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mssg)
        })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const getScheduleForAll = (hotel_id) => {
    return fetch(`/api/manager/getscheduleforall/${hotel_id}`,
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
    return fetch(`/api/manager/changepayroll/${hotel_id}/${emp_id}/${new_pay}`,
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
    return fetch(`/api/manager/schedule/${hotel_id}/${emp_id}/${date}`,
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
    return fetch(`/api/manager/scheduleStart/${hotel_id}/${emp_id}/${date}/${time}`,
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
    return fetch(`/api/manager/scheduleEnd/${hotel_id}/${emp_id}/${date}/${time}`,
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
    return fetch(`/api/manager/addschedule/${hotel_id}/${emp_id}/${date}/${starttime}/${endtime}`,
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
