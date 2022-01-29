import React from 'react';
import ReactDOM from 'react-dom';
import * as ecies from "ecies-wasm";
import './index.css';
import App from './App';

ReactDOM.render(
    <App />, 
    // <div>Hi</div>,
    document.getElementById("root")
);

// function check_secp256k1() {
//     const [sk, pk] = ecies.generate_keypair();
//     const data = Uint8Array.from([1, 2, 3, 4]);
  
//     const encrypted = ecies.encrypt(pk, data);
//     const decrypted = ecies.decrypt(sk, encrypted);
//     alert("decrypted: " + decrypted);
//   }
  
//   function check_ed25519() {
//     const data = Uint8Array.from([1, 2, 3, 4]);
//     const [sk, pk] = ed25519.generate_keypair();
  
//     const encrypted = ed25519.encrypt(pk, data);
//     const decrypted = ed25519.decrypt(sk, encrypted);
//     alert("ed25519 decrypted: " + decrypted);
//   }