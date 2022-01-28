import * as ecies from './ecies_wasm_bg'

export const BASE_URL = 'http://192.168.1.46:5000'

export function call_post_api(age, msg, setState) {
    fetch(BASE_URL + '/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt({
                'age': Number(age),
                'message': msg
            })
        })
        .then(response => response.json())
        .then(res => setState(res))
        .catch(err => console.error(err))
}

export function call_get_api(setState) {
    fetch(BASE_URL + '/hello')
        .then(response => response.json())
        .then(res => setState(res['message']))
        .catch(err => console.log(err))
}

function encrypt(request) {
    return JSON.stringify(request)
}