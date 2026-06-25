// Elements on profile.html
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const previewContainer = document.getElementById('previewContainer');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');

let selectedFile = null, imageObject = null;

if (imageInput) {
    imageInput.addEventListener('change', handleFileSelect);
}

if (saveButton) {
    saveButton.addEventListener('click', () => handleSave(saveButton), {bubble: false});
}

if (clearButton) {
    clearButton.addEventListener('click', handleClear);
}

function handleFileSelect(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    selectedFile = files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
        if (previewImage) {
            imageObject = e.target.result;
            previewImage.src = e.target.result;
            saveButton.style.display = 'flex';
        }
    };
    reader.readAsDataURL(selectedFile);
}

function handleSave(button) {

    if(button.getAttribute('data-active-state') === 'true') return alert('Please wait...');
    if (!selectedFile) return;

    button.setAttribute('data-active-state', 'true');
    let spinner = document.querySelector('.spinner')
    let uploaded = document.querySelector('.uploaded')
    let uploader = document.querySelector('.uploader')
    
    uploader.style.display = 'none';
    spinner.style.display = 'flex';
    
    setTimeout(() => {
        if(imageObject) {
            const imagePath = imageObject;
            const currentUserObj = getUser();
            if (!currentUserObj) return;
    
            currentUserObj.profilePic = imagePath;
    
            spinner.style.display = 'none';
            //loader.style.display = 'flex';
            saveUser(currentUserObj);
            
            // Log activity
            logActivity('profile_pic', 'Updated profile picture', {});
            

            spinner.style.display = 'none';
            uploaded.style.display = 'flex';

            setTimeout(() => {
                uploaded.style.display = 'none'
                uploader.style.display = 'flex'
                handleUpdate();
                button.removeAttribute('data-active-state');
            }, 2000);

    
            if (previewImage) {
                previewImage.src = imagePath;
                clearButton.style.display = 'flex';
            }
            if (imageInput) {
                imageInput.value = '';
            }
            imageObject = null;
        }
    }, 3000)
}

function handleClear() {
    const currentUserObj = getUser();
    if (!currentUserObj) return;

    let removeImage = confirm('Delete this profile image?')

    if(!removeImage) return ;

    currentUserObj.profilePic = '';
    saveUser(currentUserObj);
    alert('removed image');

    if (previewImage) {
        previewImage.src = 'images/user1.png';
        if(profilepic){
            profilepic.src = 'images/user1.png';
            clearButton.style.display = 'none';
        }
    }
    if (imageInput) {
        imageInput.value = '';
    }
    selectedFile = null;
}

function handleUpdate() {
    let user = getUser(); 
    let imageArea = document.getElementById("profilepic");
    let profilePreview = document.getElementById("previewImage");

    if(document.getElementById('saveButton')){
        saveButton.style.display = "none";
    }
    
    if(user && user.profilePic) {
        imageArea.src = user.profilePic;
        if (profilePreview) {
            profilePreview.src = user.profilePic;
        }
    } else {
        imageArea.src = 'images/user1.png';
        if(clearButton) clearButton.style.display = "none";
        if (profilePreview) {
            profilePreview.src = 'images/user1.png';
        }
    }
}

function displayUserDetails() {
    const user = getUser();
    if (!user) return;

    const fullNameElement = document.getElementById('userFullName');
    const emailElement = document.getElementById('userEmail');

    if (fullNameElement && user.fullname) {
        fullNameElement.textContent = user.fullname;
    }
    if (emailElement && user.email) {
        emailElement.textContent = user.email;
    }
}

/* update user profile details */
function updateUser(e) {
    let dataSection = e.closest('#user-info')

    if(dataSection){
        let firstName = ufname.value.trim();
        let lastName = ulname.value.trim();
        let email = uemail.value.trim();
        let location = ulocation.value.trim();
        let oldPass = document.getElementById('oldPass').value;
        let newPass = document.getElementById('newPass').value;

        let userStorageData = getUser();

        let fullname, required = '';

        if(firstName === ''){
            required = 'firstname'
        }else if(lastName === ''){
            required = 'lastname'
        }else if(email === ''){
            required = 'email'
        }

        fullname = firstName + ' ' + lastName;

        if(required) {
            alert(`${required} cannot be empty`);
        } else {
            // test for other values ... 
            user = user || getUser();

            if((user.fullname === fullname) && (user.email === email) && (user.location === location)){
                return alert('no new changes made.');
            }

            // check if email exists in the storage
            let users = getUsers();

            console.log(users);

            if(user.email !== email){
                if(email.trim() === '') return alert('email cannot be empty!');
                if(users.find(user => user.email === email)) return alert('New email already exists.')
            }

            user = Object.assign(user, {fullname, email, location});

            if(newPass) user.password = newPass; // update if required

            let savedUser = saveUser(user);

            if(saveUser(user)){
                alert('profile details update successful!');
                logActivity('profile_update', 'Updated profile details')
            }else{
                alert('profile details update failed!');
            }

        }
    }

}

function updatePassword() {
    let oldPassword = oldPass.value;
    let newPassword = newPass.value;

    let userStorageData = getUser();

    if(!oldPassword) return alert("old password must be supplied");
    if(!newPassword) return alert("new password must be supplied");
    if(newPassword.length < 6) return alert("new password must a minimum of 6 characters");
    if(!newPassword.trim()) return alert("new password cannot be empty characters");

    if((newPassword === oldPassword) || (userStorageData.password === newPassword)) return alert("new password cannot be the same as old.");

    if(oldPassword !== userStorageData.password) return alert('old password validation failed.');

    user = Object.assign(userStorageData, {password: newPassword}); // updating global user variable 
    
    if(saveUser(user)){
        oldPass.value = '';
        newPass.value = '';
        alert('profile details update successful!');
        logActivity('password_change', 'User password update')
    }else{
        alert('profile details update failed!');
    }

}

handleUpdate();
displayUserDetails();