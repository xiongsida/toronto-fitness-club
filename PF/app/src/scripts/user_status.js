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
            if (data['url']) {
                localStorage.setItem('user_url', data['url']);
            } else {
                throw new Error(JSON.stringify(data));
            }
        }).catch(error => {
            localStorage.clear();
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

export const getUserSubscribePlan = (url, token) => {
    return getUserData(url, token)
        .then(data => {
            return new Promise((resolve, reject) => {
                if (data.subscription) {
                    resolve(data.subscription);
                } else {
                    reject('no subscription');
                }
            });
        });
}

export const getFutruePlan = (url, token) => {
    return getUserData(url, token)
        .then(data => {
            return new Promise((resolve, reject) => {
                if (data.upcoming_plan) {
                    resolve(data.upcoming_plan);
                } else {
                    reject('no future plan');
                }
            });
        })
        .then(data => {
            return fetch(data, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
        })
        .then(response => response.json())
        .then(data => {
            return new Promise((resolve, reject) => {
                if (data.plan) {
                    resolve(data.plan);
                }
                else {
                    reject('no plan');
                }
            });
        });
}



export const isSubscribed = (usr_url, token) => {
    return getUserData(usr_url, token)
        .then(data => {
            return new Promise((resolve, reject) => {
                if (data.subscription) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
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
