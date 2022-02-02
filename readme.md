# Introduction
ECC based Encryption/Decryption in JS/wasm and python based app.
`[ecc, wasm, js, python, rust]`

This is a demo project on encrypted communication between UI & backend over http/s, and delegating all heavy lifting(encryption in this case) to wasm binary compiled from `ecies` rust crate(https://docs.rs/ecies/0.2.1/ecies). The js binding for `ecies` wasm binary is handled with `ecies-wasm` npm package.

UI is built with reactjs and backend is a flask based api server. Encryption scheme being used: `ecies`(ECC based hybrid encryption).

## Workflow:
- Server app hosts private-key in `flask-app/keys` folder (default name `private.ec.key`), 
- It generate public key on the go, and serve it at `/pubkey`
- UI calls `/pubkey` to get a public key(ECC based compressed public key in base64 format)
- For further calls UI encrypts the payload with the public key
- On server provate key is used to decrypt the payload.

```plantuml
title Two-way encryption using ECIES
actor user
participant UI
participant Backend

user -> UI: Load Page
activate UI
UI -> Backend: GET /pubkey (SERVER_PKEY: server public key)
activate Backend
note right: SERVER_PKEY = Backend Public key\nSERVER_SKEY = Backend Private key
Backend --> Backend: Get SERVER_PKEY from storage
Backend -> UI: SERVER_PKEY(in compressed base64 format(35 base64 chars))
deactivate Backend
UI --> UI: Persist SERVER_PKEY in localStorage
UI --> UI: Generate key pair UI_SKEY, UI_PKEY (stored in-memory)
note left: UI_PKEY = UI Public key\nUI_SKEY = UI Private key
UI -> user: WebPage content
deactivate UI

note over UI, Backend: Only SERVER_PKEY, UI_PKEY are shared across network.\nSERVER_SKEY, UI_SKEY always remains with owner

user -> UI: GET /hello
activate UI
UI -> Backend: GET /hello (headers {x-pub-key : UI_PKEY})
activate Backend
Backend --> Backend: Encrypt response with UI_PKEY
Backend -> UI: Encrypted payload
deactivate Backend
UI --> UI: Decrypt payload with UI_SKEY
UI -> user: Response
deactivate UI

user -> UI: POST /data
activate UI
UI --> UI: encrypt payload body with SERVER_PKEY
UI -> Backend: POST /data (headers {x-pub-key : UI_PKEY}, body: encrypted)
activate Backend
Backend --> Backend: decrypt payload with SERVER_SKEY
Backend --> Backend: encrypt response with UI_PKEY
Backend -> UI: Encrypted payload
deactivate Backend
UI --> UI: Decrypt payload with UI_SKEY
UI -> user: Response
deactivate UI
```

## How to start:
- Run server:
  - Generate privyte key with `python eciespy_demo.py`, save content as `flask-app/keys/private.ec.key`
    ```sh
    cd flask-app
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python app.py
    ```
- Run UI:
  - Update server host url in `api.js`
    ```sh
    cd ui-react-webapck
    yarn
    yarn start
    ```

## Demo example:
- UI gets public key `GET /pubkey`, save to Local Storage
- Get `age`, `msg` as input, create JSON payload, encrypt using Public Key, convert encrypted data to base64.
- call `POST /data` with payload
- Server decrypts base64 encoded payload, decrypts using private-key, send `age`, `msg` back in response.


## Useful Commands:
- Create private key: `openssl ecparam -name prime256v1 -genkey -noout -out private.ec.key`
- Create public key: `openssl ec -in private.ec.key -pubout -out public.pem`
- Encrypt: `openssl cms -encrypt -binary -aes-256-cbc -in plaintext.dat -out ciphertext.dat p256-cert.pem`
- wasm build for web:
    ```sh
    cargo install wasm-pack
    wasm-pack build --target web
    cargo install cargo-generate
    cargo generate --git https://github.com/rustwasm/wasm-pack-template.git --name mycrypto
    ```
