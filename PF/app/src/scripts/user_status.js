import { resolveTo } from '@remix-run/router';

const config = require('../TFCConfig.json');

export const storeURLFn = () => {
    return fetch(config.AUTH_URL + '/verify', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('access_token')
        }),
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user_url', data['url']);
        });
}

export const authHeaders = {
    'Authorization': `Bearer ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json'
}

export const loginFn = (username, password) => {
    return fetch(config.AUTH_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ username, password })
    });
}

export const getUserData = (url, token) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json());
}


export const getUserSubs = (url, token) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Athorization": `Bearer ${token}`,
        },
    })
        .then(response => response.json());
}


// export const refreshAvatarFn = () => {
//     const user_url = localStorage.getItem('user_url');
//     if (user_url) {
//         return fetch(user_url, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": 'application/json',
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data['avatar']);
//                 resolve(data['avatar']);
//             });
//     } else {
//         return false;
//     }
// }
