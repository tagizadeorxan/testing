import addMessage, { jsonFile } from './messages.js';

localStorage.setItem('username','anonim');

let result;
let messages = document.querySelector("#messages");


let messageSend = (e) => {
    if(e.key === "Enter") {
        let message = e.target.parentNode.children[0].value;
        result = addMessage(localStorage.getItem('username'), message);
        messageInput.value="";
        result.then(res => {
            if (res) {
                showMessages();
            } else {
                console.error("olmadi")
            }
        })
    }    
    }


let messageInput = document.getElementById("message-input");
messageInput.addEventListener("keydown",(e)=>messageSend(e));






let showMessages = () => {
    let array = JSON.parse(jsonFile)
    let message = document.createElement('p');
    let color= '#'+Math.floor(Math.random()*16777215).toString(16);
    message.innerHTML = `<span style="color:${color}">${array[array.length - 1].name}</span> 
       ${array[array.length - 1].message}`
    messages.append(message)

   

}



let setUser = document.getElementById("setUser");

setUser.addEventListener("click",getUserName);

function getUserName (e) {
   let username = e.target.parentNode.children[1].value;
   localStorage.setItem('username',username);
}









