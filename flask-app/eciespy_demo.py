from ecies.utils import generate_eth_key, generate_key
import base64
from ecies import encrypt, decrypt
from ecies import PrivateKey

data = b'this is a test'
secp_k = generate_key()
sk_bytes = secp_k.secret
print(f"sk_bytes: {len(sk_bytes)}")
pk_bytes = secp_k.public_key.format(True)  
print(f"pk_bytes: {len(pk_bytes)}")
print(f"pk_bytes: {str(base64.b64encode(pk_bytes))}")
print(f"Hex: {''.join('{:02x}'.format(x) for x in pk_bytes)}")
print(decrypt(sk_bytes, encrypt(pk_bytes, data)))

print(f"{secp_k.to_pem()}")

# import array
# filebytes= array.array('B')
# filebytes.fromfile(open("./keys/private.ec.key", "rb")) 
# key = PrivateKey.from_pem(filebytes)
# print(f"Hex: {''.join('{:02x}'.format(x) for x in key.public_key.format(True))}")


with open("./keys/private.ec.key", "rb") as f:
    key = PrivateKey.from_pem(bytearray(f.read()))
    print(f"Hex: {''.join('{:02x}'.format(x) for x in key.public_key.format(True))}")
