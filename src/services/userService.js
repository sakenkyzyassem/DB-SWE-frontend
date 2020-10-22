// get user's information
export const getUserData = (userId) => {
    return fetch('/api/guests/' + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch(err => console.log(err));
}