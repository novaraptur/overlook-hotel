
let getData = (endpoint) => fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then(response => response.json())
    .catch(err => console.error('not working', err));

function retrieveData() {
  return Promise.all([getData('customers'), getData('rooms'), getData('bookings')]);
}

let sendData = (sentData, url) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(sentData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => console.log("SENT", json))
    .catch(err => console.log(err));
}

let postData = (postableData, endpoint) => {
  return Promise.all([sendData(postableData, `http://localhost:3001/api/v1/${endpoint}`)]);
}

let getUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json())
    .catch(err => console.error("not working"));
}

export {retrieveData, postData, getUser};
