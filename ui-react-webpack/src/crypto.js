import * as ecies from "ecies-wasm";

const [s_key, p_key] = ecies.generate_keypair();

export function get_pub_key() {
    const p_key_b64 = btoa(String.fromCharCode.apply(null, p_key));
    return p_key_b64
}

export function encrypt(request) {
    var result = 'n/a'
    const key_b64 = localStorage.getItem('pubkey') || '';
    try {
        const pk = Uint8Array.from(atob(key_b64), c => c.charCodeAt(0))
        const req_str = JSON.stringify(request);
        console.log("Plaintext request: " + req_str)
        const data = new TextEncoder().encode(req_str)
        const encrypted = ecies.encrypt(pk, data);
        const b64_encoded = btoa(String.fromCharCode.apply(null, encrypted));
        console.log("Encrypted request: " + b64_encoded);
        result = b64_encoded
    } catch (error) {
        console.error("Error:--> " + JSON.stringify(error))
        throw error
    }
    return String(result);
}

export function decrypt_payload(payload) {
    var result = {}
    try {
        console.log("Encrypted response: " + payload);
        const payload_bytes = _base64ToArrayBuffer(payload)
        const decrypted_payload = ecies.decrypt(s_key, payload_bytes)
        const decrypted_str = new TextDecoder().decode(decrypted_payload)
        console.log('Decrypted response: ' + decrypted_str)
        result = JSON.parse(decrypted_str)
    } catch (error) {
        console.error("Error:--> " + JSON.stringify(error))
        throw error
    }
    return result;
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}


// const s_key_hex = '9cd9cd035c2e4c1d8504ea6244d63a42420f51fb3b11b23c8f97020b115863ae';
// const s_key_bytes = new Uint8Array(s_key_hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// console.log(ecies.decrypt(s_key_bytes, encrypted))
// console.log(new TextDecoder().decode(ecies.decrypt(s_key_bytes, encrypted)))