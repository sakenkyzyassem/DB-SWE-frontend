
/**************** GUEST AUTH ********************/
export const signInGuest = (guest) => {
    return signInPOST('/api/login/', guest);
}

export const signOutGuest = (token) => {
    return signOutPOST(`/api/guests/logout/${token}` );
}
/***************** DESK CLERK AUTH **************/
export const signInDeskClerk = (guest) => {
    return signInPOST('/api/logindeskclerk', guest);
}

export const signOutDeskClerk = (token) => {
    return signOutPOST(`/api/deskclerk/logout/${token}`);
}

/***************** MANAGER AUTH *****************/
export const signInManager = (guest) => {
    return signInPOST('/api/logindeskclerk', guest);
}

export const signOutManager = (token) => {
    return signOutPOST(`/api/manager/logout/${token}`);
}

/********************* SIGN IN ******************/
const signInPOST = (url, data) => {
    return fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(err => console.log(err));
}
/******************** SIGN OUT ********************/
const signOutPOST = (url) => {
    return fetch(url,
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