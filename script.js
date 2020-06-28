import addMessage, { jsonFile } from './messages.js';

localStorage.setItem('username','anonim');

let result;
let messages = document.querySelector("#messages");

let showResult = 0;

fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
.then(res=> res.json())
.then(res=> showResult = res.length);



    messages.innerHTML="";
fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
.then(res=>res.json()).then(res=> {
    res.map(e=> {
       
        let message = document.createElement('p');
        let color= '#'+Math.floor(Math.random()*16777215).toString(16);
        message.innerHTML = `<span style="color:${color}">${e.name}</span> 
        ${e.message}`
        messages.append(message)
    })
})

setInterval(()=>{
    fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
    .then(res=>res.json()).then(res=> {
          if(res.length>showResult) {
              showResult = res.length;
              for(let i=showResult;i<=res.length-1;i++) {
                let message = document.createElement('p');
                let color= '#'+Math.floor(Math.random()*16777215).toString(16);
                message.innerHTML = `<span style="color:${color}">${res[i].name}</span> 
                ${res[i].message}`
                messages.append(message)
              }
          }
    })

},1000)





    
   
    

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
    let options = {
        headers: {
            "Content-type":"application/json"
        },
        method:"GET",
    }

    fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`,options)
    .then(res=>res.json()).then(res=>{
   if(res.length<100) {
  let message = document.createElement('p');
    let color= '#'+Math.floor(Math.random()*16777215).toString(16);
    message.innerHTML = `<span style="color:${color}">${res[res.length - 1].name}</span> 
       ${res[res.length - 1].message}`
    messages.append(message)

    res.map(e=>console.log(e))

   } else {
    let deleteOption = {
        headers: {
            "Content-type":"application/json"
        },
        method:"DELETE",
    }
     
    res.map(e=>{
        fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages/${e.id}`,deleteOption)
    })
   }
    })     
}



let setUser = document.getElementById("setUser");
setUser.addEventListener("click",getUserName);

function getUserName (e) {
   let username = e.target.parentNode.children[1].value;
   localStorage.setItem('username',username);
}









