
const CryptoJS = require('crypto-js');
const socket = io('http://localhost:9000');


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


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    let message = messageInput.value;
    append(`You: ${message}`, 'right');
    message = encryptWithAES(message);
    socket.emit('send', message);
    messageInput.value= ''
})

let names = prompt("Enter your name to join");
names = encryptWithAES(names);
socket.emit('new-user-joined', names);

socket.on('user-joined', names =>{
    names = decryptWithAES(names);
    append(`${names} joined the chat`, 'right')
})

socket.on('receive', data => {
    data.names = decryptWithAES(data.names);
    data.messages= decryptWithAES(data.messages);
    append(`${data.names}: ${data.messages}`, 'left')
})

socket.on('left', names => {
    names = decryptWithAES(names);
    append(`${names}: left the chat`, 'left')
})


