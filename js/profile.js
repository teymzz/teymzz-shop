function saveUser(user){
    const usersDatabase = JSON.parse(localStorage.getItem('AprilUsers')) || [];
    const currentUserIndex = Number(localStorage.getItem('currentUserIndex'));
    if (currentUserIndex >= 0 && currentUserIndex < usersDatabase.length) {
        usersDatabase[currentUserIndex] = user;
        localStorage.setItem('AprilUsers', JSON.stringify(usersDatabase));
    }
}

// Elements on profile.html
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const previewContainer = document.getElementById('previewContainer');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');

let selectedFile = null;

if (imageInput) {
    imageInput.addEventListener('change', handleFileSelect);
}

if (saveButton) {
    saveButton.addEventListener('click', handleSave);
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
            previewImage.src = e.target.result;
        }
    };
    reader.readAsDataURL(selectedFile);
}

function handleSave() {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const imagePath = e.target.result;
        const currentUserObj = getUser();
        if (!currentUserObj) return;

        currentUserObj.profilePic = imagePath;
        saveUser(currentUserObj);
        handleUpdate();
        // console.log('Saved image path:', imagePath);

        if (previewImage) {
            previewImage.src = imagePath;
        }
        if (imageInput) {
            imageInput.value = '';
        }
        selectedFile = null;
    };
    reader.readAsDataURL(selectedFile);
}

function handleClear() {
    const currentUserObj = getUser();
    if (!currentUserObj) return;

    currentUserObj.profilePic = '';
    saveUser(currentUserObj);
    alert('removed image');

    if (previewImage) {
        previewImage.src = 'images/user1.png';
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
    
    if(user && user.profilePic) {
        imageArea.src = user.profilePic;
        if (profilePreview) {
            profilePreview.src = user.profilePic;
        }
    } else {
        imageArea.src = 'images/user1.png';
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

handleUpdate();
displayUserDetails();