
let userID = localStorage.getItem('currentUserIndex');

let usersDatabase = JSON.parse(localStorage.getItem('AprilUsers')) || []

if((userID !== null) && (usersDatabase.length !== 0)){
    console.log(usersDatabase);
    
    if(usersDatabase[userID] !== undefined){
        window.location.href = 'index.html'
    }
}