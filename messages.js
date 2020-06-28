let array = []
let jsonFile;

function addMessage(name, message) {
    let result = new Promise((res, rej) => {
        let action = array.push({ name, message });
        if (action) {
            jsonFile = JSON.stringify(array);
            res(true)
        } else {
            res(false)
        }
    })
    return result;
}

export default addMessage;
export { jsonFile };



