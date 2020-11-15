let access_token = '';

export const signInDeskClerk = (guest) => {
    return fetch('/api/logindeskclerk',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest),
        })
        .then(response => response.json())
        .then(res => access_token = res.token)
        .catch(err => console.log(err));
}

export const getAllGuests = () => {
    return fetch(`/api/allguests`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getEmployeeData = () => {
    return fetch(`/api/`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeBookingStatus = (bh_id, roomtype, status) => {
    return fetch(`/api/deskclerk/changestatusbh/${bh_id}/${roomtype}/${status}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const cancelBooking = (bh_id, roomtype, number_of_rooms) => {
    return fetch(`/api/deskclerk/cancelbooking/${bh_id}/${roomtype}/${number_of_rooms}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeBooking = (bookingHistory) => {
    return fetch(`/api/deskclerk/changebooking`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingHistory)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const filterRooms = (bookingHistory) => {
    return fetch(`/api/deskclerk/filterbyroomtype`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingHistory)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const findGuest = (guest) => {
    return fetch(`/api/deskclerk/findguest`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const filterByRoomType = (bookingHistory) => {
    return fetch(`/api/deskclerk/filterbyroomtype`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingHistory)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeRoom = (bh_id, room_num) => {
    return fetch(`/api/deskclerk/changeroom/${bh_id}/${room_num}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

