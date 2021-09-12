const CryptoJS = require("crypto-js");

let encryptWithAES = (text) => {
  let passphrase = "12354";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

let decryptWithAES = (ciphertext) => {
  let passphrase = "12354";
  let bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

function task()
{
    let texts= "ROHIT Negi is";
    texts = encryptWithAES(texts);
    console.log(texts);
    texts = decryptWithAES(texts);
    console.log(texts);
};

task();