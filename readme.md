#### Commands:
- Create private key: `openssl ecparam -name prime256v1 -genkey -noout -out private.ec.key`
- Create public key: `openssl ec -in private.ec.key -pubout -out public.pem`
- Encrypt: `openssl cms -encrypt -binary -aes-256-cbc -in plaintext.dat -out ciphertext.dat p256-cert.pem`