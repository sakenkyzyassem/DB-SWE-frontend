// get user's all bookings
export const getUserBookings = (user) => {
    return fetch(`/api/bookinghistory/byguest/${user}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const deleteBooking = (booking) => {
    return fetch("/api/deletebooking/", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
        .then(response => response.json())
        .catch((err) => console.log(err));
}

export const editBooking = (roomtype, booking) => {
    return fetch(`/api/changebooking/${roomtype}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
        .then(response => response.json());
}

export const createBooking = (booking) => {
    return fetch('/api/bookinghistory', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
}

export const addOccHist = (booking) => {
    return fetch('/api/bookinghistory/addoccupation', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
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
        .then(res => res.json())
}