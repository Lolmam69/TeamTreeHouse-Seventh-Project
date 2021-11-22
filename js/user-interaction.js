const alertBell = document.querySelector('.notification-bell');
const dropdown = document.getElementById('dropdown-menu');
const alertBox = document.querySelector('.alert');
const alertButton = alertBox.lastElementChild;

const chartSelectRadio = document.querySelectorAll('input[name=traffic]');
let prevRadio = null;

const messageButton = document.querySelector('.send-btn');

const emailNotificationBtn = document.getElementById('email-notification');
const publicProfileBtn = document.getElementById('public-profile');
const timezoneSelect = document.getElementById('timezone');
const settingBtn = document.querySelector('.settings-btn');
const saveBtn = settingBtn.firstElementChild;
const cancelBtn = settingBtn.lastElementChild;

const defaultSettings = {
    emailNotification: false,
    publicProfile: false,
    timezone: 'GMT',
};

// Toggles dropdown menu
function dropdownToggle() {
    dropdown.classList.toggle('show');
}

// Closes the alert box
function alertClose() {
    alertBox.style.display = 'none';
}

// Updates traffic chart data
function updateData(chart, dataType, labelType) {
    chart.data.labels = labelType;
    chart.data.datasets[0].data = dataType;
    chart.update();
}

// Sends given message to the selected user
function sendMessage(user, message) {
    let messageSuccess = false;
    if (user === '') {
        alert('No user has been selected.');
    } else if (message === '') {
        alert('The message field has been left empty.');
    } else {
        alert(`Your message to ${user} has been sent successfully.`);
        messageSuccess = true;
    }
    return messageSuccess;
}

// If there are settings options in local storage it selects those settings, else it selects default settings
function updateSettings() {
    emailNotificationBtn.checked = defaultSettings.emailNotification;
    publicProfileBtn.checked = defaultSettings.publicProfile;
    timezoneSelect.value = defaultSettings.timezone;
}
updateSettings();

alertBell.addEventListener('click', () => {
    dropdownToggle();
});

window.addEventListener('click', (event) => {
    if (event.target.classList.value !== 'notification-bell') {
        if (dropdown.classList.contains('show')) {
            dropdownToggle();
        }
    }
});

alertButton.addEventListener('click', () => {
    alertClose();
});

for (let i = 0; i < chartSelectRadio.length; i++) {
    const radio = chartSelectRadio[i];
    radio.addEventListener('change', () => {
        if (radio.value === 'hourly') {
            updateData(trafficChart, hourlyTrafficData, hourlyTrafficLabels);
        } else if (radio.value === 'daily') {
            updateData(trafficChart, dailyTrafficData, dailyTrafficLabels);
        } else if (radio.value === 'weekly') {
            updateData(trafficChart, weeklyTrafficData, weeklyTrafficLabels);
        } else if (radio.value === 'monthly') {
            updateData(trafficChart, monthlyTrafficData, monthlyTrafficLabels);
        }
    });
}

messageButton.addEventListener('click', () => {
    let user = document.getElementById('search-user');
    let message = document.getElementById('message-user');
    const sent = sendMessage(user.value, message.value);
    if (sent) {
        user.value = '';
        message.value = '';
    }
});
