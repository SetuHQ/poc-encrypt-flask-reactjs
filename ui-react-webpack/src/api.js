import { decrypt } from 'ecies-wasm'
import { encrypt, decrypt_payload, get_pub_key } from './crypto'
export const BASE_URL = 'http://192.168.1.46:5000'

export function call_post_api(age, msg, setState) {
    fetch(BASE_URL + '/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-pub-key': get_pub_key()
            },
            body: JSON.stringify({
                'data': encrypt({
                    'age': Number(age),
                    'message': msg
                })
            })
        })
        .then(response => response.text())
        .then(data => decrypt_payload(data))
        .then(res => setState(res))
        .catch(err => console.error(err))
}

export function call_get_api(setState) {
    fetch(BASE_URL + '/hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-pub-key': get_pub_key()
            }
        })
        .then(response => response.text())
        .then(data => decrypt_payload(data))
        .then(res => setState(res['message']))
        .catch(err => console.log(err))
}