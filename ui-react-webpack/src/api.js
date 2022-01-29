import * as ecies from "ecies-wasm";

export const BASE_URL = 'http://192.168.1.46:5000'

export function call_post_api(age, msg, setState) {
    fetch(BASE_URL + '/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'data': encrypt({
                    'age': Number(age),
                    'message': msg
                })
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
    var result = 'n/a'
    const key_b64 = localStorage.getItem('pubkey')
    try {
        const pk = Uint8Array.from(atob(key_b64), c => c.charCodeAt(0))
        const req_str = JSON.stringify(request);
        const data = Uint8Array.from(req_str);
        const encrypted = ecies.encrypt(pk, data);
        const b64_encoded = btoa(String.fromCharCode.apply(null, encrypted));
        console.log("Encrypted: " + String(encrypted));
        result = b64_encoded
    } catch (error) {
        console.error("Error:--> " + JSON.stringify(error))
    }
    return String(result);
}