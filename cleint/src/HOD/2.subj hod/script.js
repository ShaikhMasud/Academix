document.querySelectorAll('.stream-box').forEach(box => {
    box.addEventListener('click', () => {
        let stream = box.id;
        window.location.href = `/${stream}-overview.html`; // Example of navigating to a stream's overview page
    });
});


function toggleLogoutMenu() {
    const logoutMenu = document.getElementById('logoutMenu');
    if (logoutMenu.style.display === 'block') {
        logoutMenu.style.display = 'none';
    } else {
        logoutMenu.style.display = 'block';
    }
}

function logout() {
    alert('Logging out...');
    // Add your logout logic here
}


const randomImageUrl = 'https://picsum.photos/1920/1080?random=' + Math.floor(Math.random() * 1000);

    document.getElementById('background-image').src = randomImageUrl;