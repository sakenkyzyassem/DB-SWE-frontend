// get user's all bookings
export const getUserBookings = (user) => {
    return fetch('/api/bookinghistory/'+"random000@gmail.com", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const deleteBooking = (id) => {
    return fetch("/api/bookinghistory/"+id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch((err) => console.log(err));
}

export const editBooking = (id, booking) => {
    return fetch("/api/bookinghistory/"+id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
        .then(response => response.json())
        .catch((err) => console.log(err));
}