function navigateTo(page) {
    switch(page) {
        case 'play':
            window.location.href = 'play.html';
            break;
        case 'settings':
            window.location.href = 'settings.html';
            break;
        case 'highscore':
            window.location.href = 'highscore.html';
            break;
    }
}

// Placeholder functions for settings and highscore
function showSettings() {
    alert("Settings page is under construction.");
}

function showHighscore() {
    alert("Highscore page is under construction.");
}