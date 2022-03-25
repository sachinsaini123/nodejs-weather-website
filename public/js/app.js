////// Browser HTTP Requests with fetch 
const weatherForm = document.querySelector('form');
const serchAddress = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    // below function will stop browser to perferm default behaviour
    e.preventDefault()
    const location = serchAddress.value;
    message1.textContent = 'loading...';
    message2.textContent = '';
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
        response.json().then((body) => {
            if(body.error){
                message1.textContent = body.error;
            } else {
                message1.textContent = body.location;
                message2.textContent = body.forecast;
            }
        });
    })
})