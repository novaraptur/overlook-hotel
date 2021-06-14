
// let getData = (endpoint) => fetch(`http://localhost:3001/api/v1/${endpoint}`)
//   .then(response => response.json())
//   .catch(err => console.log('error1', err));
//
// function retrieveData() {
//   return Promise.all([getData('users'), getData('hydration'), getData('sleep'), getData('activity')])
// }
//
// let sendData = (sentData, url) => {
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(sentData),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(response => response.json())
//     .then(json => console.log("This is the Json post being sent from the API FILE", json))
//     .catch(err => console.log(err));
// }
//
// let postData = (postableData, urlEndpoint) => {
//   return Promise.all([sendData(postableData, `http://localhost:3001/api/v1/${urlEndpoint}`)]);
// }
//
// export {retrieveData, postData};






// const fetchCustomersData = () => {
//   return fetch('http://localhost:3001/api/v1/customers')
//     .then(response => response.json())
//     .catch(err => console.error("not working"))
// }
// const fetchBookingsData = () => {
//   return fetch('http://localhost:3001/api/v1/bookings')
//     .then(response => response.json())
//     .catch(err => console.error("not working"))
// }
//
// const fetchRoomsData = () => {
//   return fetch('http://localhost:3001/api/v1/rooms')
//     .then(response => response.json())
//     .catch(err => console.error("not working"))
// }
//
// const fetchUser = (id) => {
//   return fetch(`http://localhost:3001/api/v1/customers/${id}`)
//     .then(response => response.json())
//     .catch(err => console.error("not working"))
// }
//
// const postBooking = (newBooking) => {
//   let url = 'http://localhost:3001/api/v1/bookings/'
//   fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newBooking)
//   })
//   .then(checkResponse);
// }
//
// const checkResponse = (response) => {
//   if (response.ok) {
//     // document.getElementById('errorMessage').innerText = ""
//     return response.json();
//   }
//   else {
//     console.log(response.status)
//     if (response.status === 422) {
//       let error = new Error('Bad Post Request')
//       // let message = `${response.status} ${error.message} - Please enter data correctly`
//       // document.getElementById('errorMessage').innerText = message
//       throw error;
//     }
//     else {
//       let error = new Error('Something went wrong')
//       let message = `${error.message}`;
//       document.getElementById('errorMessage').innerText = message
//       throw error
//     }
//   }
// }
//
// const getData = () => {
//   return Promise.all([fetchCustomersData(), fetchBookingsData(), fetchRoomsData()])
// }
// export default { getData, fetchUser, postBooking }





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
    .then(json => console.log("This is the Json post being sent from the API FILE", json))
    .catch(err => console.log(err));
}

let postData = (postableData, endpoint) => {
  return Promise.all([sendData(postableData, `http://localhost:3001/api/v1/${endpoint}`)]);
}

export {retrieveData, postData};
