from ecies.utils import generate_eth_key, generate_key
import base64
from ecies import encrypt, decrypt
from ecies import PrivateKey


def generate_private_key():
    secp_k = generate_key()
    print(f"{secp_k.to_pem()}")


def test_encryption():
    data = b'Hello there!'
    secp_k = generate_key()
    pk_bytes = secp_k.public_key.format(True)  
    print(f"pk_bytes: {len(pk_bytes)}")
    print(f"PK base64: {str(base64.b64encode(pk_bytes))}")
    print(f"PK Hex: {''.join('{:02x}'.format(x) for x in pk_bytes)}")
    encrypted = encrypt(pk_bytes, data)
    print(f"enc: {base64.b64encode(encrypted.encode('utf-8'))}")
    print(decrypt(secp_k.secret, encrypted))


def load_private_key():
    with open("./keys/private.ec.key", "rb") as f:
        secp_k = PrivateKey.from_pem(bytearray(f.read()))   
        print(f"{secp_k.to_hex()}")


if __name__ == '__main__':
    generate_private_key()