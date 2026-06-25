function getUser(){
    const usersDatabase = JSON.parse(localStorage.getItem('AprilUsers')) || [];
    const currentUserIndex = Number(localStorage.getItem('currentUserIndex'));
    return usersDatabase[currentUserIndex];
}

function checkAuth() {
    const currentUserObj = getUser();
    if (!currentUserObj)  window.location.href = 'login.html';
    if(!currentUserObj || !currentUserObj){
        alert('cannot validate user session');
        localStorage.removeItem('currentUserIndex');
        window.location.href = 'login.html';
    }
    return currentUserObj;
}

let user = checkAuth(); // set user default value... should be updated when necessary

window.onload = function(){
    let logoutBtn = document.getElementById('logout');
    
    logoutBtn?.addEventListener('click', function () {
        let canLogout = confirm('are you sure?');
        if (canLogout) {
        localStorage.removeItem('currentUserIndex');
        window.location.href = 'login.html';
        }
    });
}