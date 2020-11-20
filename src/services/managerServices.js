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

export const getAllSeasons = () => {
    return fetch('/api/getallseasons',
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

export const addSeason = (season, token) => {
    return fetch('/api/addseason',
        {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(season)
        })
        .then(res => res.text())          // convert to plain text
        .then(text => console.log(text))  // then log it out
        .catch(err => console.log(err));
}

export const deleteSeason = (season, hotel_id) => {
    return fetch(`/api/deleteseason/${season}/${hotel_id}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const sendMssg = (mssg) => {
    return fetch('/api/sendemail',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(mssg)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}
