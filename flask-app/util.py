from base64 import b64encode
from Crypto.PublicKey import ECC

def compress_pk(pk: str):
    publicKey = ECC.import_key(pk);
    x509withCompressed = publicKey.export_key(format='PEM', compress=True)
    print(len(x509withCompressed))
    print(x509withCompressed)
    # print(b64encode(x509withCompressed).decode('utf-8'))
    # print(len(b64encode(x509withCompressed).decode('utf-8')))


x509PemWithUncompressed = '''-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEK84K8GxUiOWq22ZZjHcvkX5ha4KT
mtvaAW1oNqCoWgK/rNDU50sH5ecKRJkNt98ap9iOoYUXnDBl1kKQTXFcTg==
-----END PUBLIC KEY-----'''

print(x509PemWithUncompressed)
print(f"Uncompresses: {len(x509PemWithUncompressed)}")
compress_pk(x509PemWithUncompressed)

