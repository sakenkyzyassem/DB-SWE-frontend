// get user's information
export const getUserData = (token) => {
    return fetch('/api/guest/' + token, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch(err => console.log(err));
}