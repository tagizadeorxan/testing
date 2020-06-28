import addMessage, { jsonFile } from './messages.js';

localStorage.setItem('username','anonim');

let result;
let messages = document.getElementById("messages");

let showResult = 0;

fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
.then(res=> res.json())
.then(res=> showResult = res.length);



    messages.innerHTML="";
let fetched = fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
.then(res=>res.json()).then(res=> {

    
    res.map(e=> {
       
        let message = document.createElement('p');
        let color= '#'+Math.floor(Math.random()*16777215).toString(16);
        message.innerHTML = `<span style="color:${color}">${e.name}</span> 
        ${e.message}`
        messages.append(message)

      
        
    } 
    
    )
    
})

fetched.then(res=>{
    var element = document.getElementById("messages");
    window.scrollTo(0, element.scrollHeight);
})







setInterval(()=>{
    fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`)
    .then(res=>res.json()).then(res=> {
          if(res.length>showResult) {
             
              
              for(let i=showResult;i<=res.length-1;i++) {
                let message = document.createElement('p');
                let color= '#'+Math.floor(Math.random()*16777215).toString(16);
                message.innerHTML = `<span style="color:${color}">${res[i].name}</span> 
                ${res[i].message}`
                messages.append(message)
                
              }
              showResult = res.length;
              var element = document.getElementById("messages");
    window.scrollTo(0, element.scrollHeight);

              if(res.length >99) {
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
          }
    })

},1000)





window.onload=function () {
    var element = document.getElementById("messages");
    console.log(element.scrollHeight)
    element.scrollTop = element.scrollHeight;
    window.scrollTo(0, 500);
}

window.scrollTop = window.height;


let messageSend = (e) => {
    if(e.key === "Enter") {
        let message = e.target.parentNode.children[0].value;
        result = addMessage(localStorage.getItem('username'), message);
        messageInput.value="";
       
    }    
    }


let messageInput = document.getElementById("message-input");
messageInput.addEventListener("keydown",(e)=>messageSend(e));




let setUser = document.getElementById("setUser");
setUser.addEventListener("click",getUserName);

function getUserName (e) {
   let username = e.target.parentNode.children[1].value;
   localStorage.setItem('username',username);
}









