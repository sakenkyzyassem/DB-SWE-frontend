

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
        // .then(res => access_token = res.token)
        .catch(err => console.log(err));
}

export const getAllGuests = () => {
    return fetch(`/api/allguests`,
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

export const changeBookingStatus = (bh_id, roomtype, status) => {
    return fetch(`/api/changestatusbh/${bh_id}/${roomtype}/${status}`,
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

export const cancelBooking = (bh_id, room_type, number_of_rooms) => {
    return fetch(`/api/cancelbooking/${bh_id}/${room_type}/${number_of_rooms}`,
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

export const changeBooking = (bookingHistory, prevroomtype, access_token) => {
    return fetch(`/api/changebooking/${prevroomtype}`,
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
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const filterByRoomType = (bookingHistory) => {
    return fetch(`/api/filterbyroomtype`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingHistory)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const changeRoom = (bh_id, roomtype, room_num) => {
    return fetch(`/api/deskclerk/changeroom/${bh_id}/${roomtype}/${room_num}`,
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

