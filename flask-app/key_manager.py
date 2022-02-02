from ecies import PrivateKey, encrypt
import json
import base64

class Keys:
    def __init__(self, key_file):
        self.private_key =  self.__read_private_key(key_file)

    def __read_private_key(self, key_path):
        with open("./keys/private.ec.key", "rb") as f:
            key = PrivateKey.from_pem(bytearray(f.read()))
        return key

keys = Keys('./keys/private.ec.key')

def encrypt_data(payload, pub_key):
    p_key = base64.b64decode(pub_key).hex()
    payload_str = json.dumps(payload)
    print(f"Plaintext: {payload_str}")
    enc_payload = encrypt(p_key, str.encode(payload_str))
    print(f"Encrypted: {base64.b64encode(enc_payload).decode('ascii')}")
    return base64.b64encode(enc_payload).decode('ascii')
