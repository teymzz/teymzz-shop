function getUser(){
    const usersDatabase = JSON.parse(localStorage.getItem('AprilUsers')) || [];
    const currentUserIndex = Number(localStorage.getItem('currentUserIndex'));
    return usersDatabase[currentUserIndex];
}


function checkAuth() {
    const currentUserObj = getUser();
    if (!currentUserObj) {
        window.location.href = 'login.html';
    }
}
checkAuth();

window.onload = function(){
    document.getElementById('logout').addEventListener('click', function () {
        let canLogout = confirm('are you sure?');
        if (canLogout) {
        localStorage.removeItem('currentUserIndex');
        window.location.href = 'login.html';
        }
    });
}