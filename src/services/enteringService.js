
<<<<<<< HEAD

export const createUserAccount = (user) => {
    return fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    }).then(response => {
        response.json()
    })
    .catch(err => console.log(err));
}

export const signInGuest = (guest) => {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guest)
    }).then(response => 
        response.json()
    )
    .catch(err => console.log(err));
}

export const signOutGuest = (token) => {
    console.log(token)
    return fetch(`/api/guests/logout/${token.token}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    }).then(response => 
        response.json()
    )
    .catch(err => console.log(err));
=======
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
>>>>>>> 9cc81896b6aab3a093f738ad7aca918d58c60254
}