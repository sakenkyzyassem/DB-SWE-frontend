export const getHotels = () => {
    return fetch('/api/hotels/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getHotel = (hotel_id) => {
    return fetch(`/api/hotels/${hotel_id}`,
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

export const getHotelFeatures = (hotel_id) => {
    return fetch(`/api/hotels/feature/${hotel_id}`,
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

export const filterRooms = (filterData) => {
    return fetch("/api/hotels/filter", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterData)
    })
        .then(response => response.json())
        .catch(err => console.log(err));
}