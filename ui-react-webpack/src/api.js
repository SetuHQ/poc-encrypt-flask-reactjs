import * as ecies from "ecies-wasm";

export const BASE_URL = 'http://192.168.1.7:5000'

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
        console.log("plaintext: " + req_str)
        const data = new TextEncoder().encode(req_str)
        const encrypted = ecies.encrypt(pk, data);
        const b64_encoded = btoa(String.fromCharCode.apply(null, encrypted));
        console.log("Encrypted: " + b64_encoded);
        result = b64_encoded
    } catch (error) {
        console.error("Error:--> " + JSON.stringify(error))
        throw error
    }
    return String(result);
}





// const s_key_hex = '9cd9cd035c2e4c1d8504ea6244d63a42420f51fb3b11b23c8f97020b115863ae';
// const s_key_bytes = new Uint8Array(s_key_hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// console.log(ecies.decrypt(s_key_bytes, encrypted))
// console.log(new TextDecoder().decode(ecies.decrypt(s_key_bytes, encrypted)))