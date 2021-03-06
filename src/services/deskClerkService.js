

export const signInDeskClerk = (guest) => {
    return fetch('/api/deskclerk/logindeskclerk',
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
    return fetch(`/api/deskclerk/changestatusbh/${bh_id}/${roomtype}/${status}`,
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
    return fetch(`/api/deskclerk/cancelbooking/${bh_id}/${room_type}/${number_of_rooms}`,
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

export const changeBooking = (bookingHistory, access_token) => {
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

export const filterByRoomType = (bookingHistory, access_token) => {
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

export const getOccupationHistory = (hotelid, bookingid) => {
    return fetch(`/api/deskclerk/alloccupationhistory/${hotelid}/${bookingid}`,
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

export const addOccupation = (occupationHistory) => {
    return fetch(`/api/bookinghistory/addoccupation`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(occupationHistory)
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const getRoomTypes = (hotel_id) => {
    return fetch(`/api/findRoomTypes/${hotel_id}`,
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

export const getHotelGuests = (hotel_id) => {
    return fetch(`/api/deskclerk/findHotelGuests/${hotel_id}`,
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

export const getRooms = (roomtype, bookingid) => {
    return fetch(`/api/deskclerk/getoccupation/${bookingid}/${roomtype}`,
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