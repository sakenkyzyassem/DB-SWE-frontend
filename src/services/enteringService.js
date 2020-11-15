export const signInGuest = (guest) => {
    return fetch('/api/login/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest),
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}

export const signOutGuest = (token) => {
    return fetch(`/api/guests/logout/${token}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}


export const signInManager = (guest) => {
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
        .catch(err => console.log(err));
}

export const signOutDeskClerk = (token) => {
    return fetch(`/api/deskclerk/logout/${token}`,
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
