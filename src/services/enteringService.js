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
    return fetch(`/api/logout/${token}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(guest),
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}