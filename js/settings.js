// Get current user
function getUsers(){
    return JSON.parse(localStorage.getItem('AprilUsers')) || [];
}
function getUser(){
    const usersDatabase = getUsers();
    const currentUserIndex = Number(localStorage.getItem('currentUserIndex'));
    return usersDatabase[currentUserIndex];
}

// Save user to database
function saveUser(user){
    const usersDatabase = JSON.parse(localStorage.getItem('AprilUsers')) || [];
    const currentUserIndex = Number(localStorage.getItem('currentUserIndex'));
    if (currentUserIndex >= 0 && currentUserIndex < usersDatabase.length) {
        usersDatabase[currentUserIndex] = user;
        localStorage.setItem('AprilUsers', JSON.stringify(usersDatabase));
        return true;
    }
    return false;
}

function getCurrentSettings() {
    const user = getUser();
    if (!user) return;
    const settings = user.settings || getDefaultSettings();
    return settings;
}

// Get default settings
// function getDefaultSettings() {
//     return {
//         // notifications: {
//         //     email: true,
//         //     sms: false,
//         //     orderUpdates: true,
//         //     promotional: false
//         // },
//         display: {
//             theme: 'light',
//             //language: 'en',
//             fontSize: 'medium'
//         },
//         // privacy: {
//         //     profileVisibility: 'private',
//         //     twoFactorAuth: false,
//         //     dataCollection: true
//         // },
//         account: {
//             //currency: 'usd',
//             autoSave: true
//         }
//     };
// }

// Collect current settings from form
function collectSettings() {
    return {
        display: {
            theme: document.getElementById('themeSelect').value,
            fontSize: document.getElementById('fontSize').value
        },
        account: {
            autoSave: document.getElementById('autoSave').checked
        }
        // notifications: {
            // currency: document.getElementById('currencySelect').value,
        //     email: document.getElementById('emailNotifications').checked,
        //     sms: document.getElementById('smsNotifications').checked,
        //     orderUpdates: document.getElementById('orderUpdates').checked,
        //     promotional: document.getElementById('promotionalEmails').checked
        // },
        // privacy: {
        //     profileVisibility: document.getElementById('profileVisibility').value,
        //     twoFactorAuth: document.getElementById('twoFactorAuth').checked,
        //     dataCollection: document.getElementById('dataCollection').checked
        // },
    };
}

// Save settings to localStorage
function saveSettings() {
    const user = getUser();
    if (!user) return showStatus('User not found', 'error');

    const settings = collectSettings();
    user.settings = settings;
    saveUser(user);

    logActivity('settings', 'Updated account settings', {});    // Log activity

    showStatus('Settings saved successfully!', 'success');
    applyTheme(settings.display.theme);
    applyFontSize(settings.display.fontSize);
}

// Reset to default settings
function resetSettings() {
    const confirmed = confirm('Are you sure you want to reset all settings to defaults?');
    if (!confirmed) return;

    const user = getUser();
    if (!user) return;

    user.settings = getDefaultSettings();
    saveUser(user);

    loadSettings();
    showStatus('Settings reset to defaults', 'success');
}

// Show status message
function showStatus(message, type) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    statusElement.style.display = 'block';

    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 4000);
}
