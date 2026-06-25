
function signInUser(ev) {

    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value.trim()

    // prevent empty fields
    if(!email || !password) return alert('all fields are mandatory');

    // Continue with user sign in validation
    showLoadingAndDisable(true , ev )

    setTimeout(() => {
        let foundUser = usersDatabase.find((user) => user.email === email)

        if(!foundUser) return alert('user doesnt exist'); 

        if (foundUser.password !== password) alert('invalid username or password'); 

        //
        let foundUserIndex = usersDatabase.findIndex((user)=> user.email === email )
        alert('sign in successful')
        localStorage.setItem('currentUserIndex' , foundUserIndex)
        window.location.href = 'index.html'

        showLoadingAndDisable( false , ev)

    }, 3000);


    
}


function showLoadingAndDisable(bool , ev) {
    ev.target.innerHTML = bool ? 'Loading...' : 'Sign in'
    ev.target.disabled = bool
}


// let nums = [1,2,3,4]

// nums.find((num , i )=>  num === 4)

// if ( 4>3 ) {
//    console.log('hey'); 
// } else {
//     console.log('hello');
// }

// 4> 3 ?   console.log('hey') : console.log('hello')