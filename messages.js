let array = []
let jsonFile;

function addMessage(name, message) {
    let result = new Promise((resolve, rej) => {
       let options = {
           headers: {
               "Content-type":"application/json"
           },
           method:"POST",
           body: JSON.stringify({
               name,message
           })
       }

      fetch(`https://5ea3c7e4270de6001645fbd1.mockapi.io/Messages`,options).then(res=> {
        if(res.status === 201) {
            resolve(true)
        }  
      }) 
    })
    return result;
}

export default addMessage;
export { jsonFile };



