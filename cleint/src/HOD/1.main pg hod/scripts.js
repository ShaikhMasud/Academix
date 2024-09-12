// Year Selection
const yearBoxes = document.querySelectorAll('.year-box');
yearBoxes.forEach(box => {
    box.addEventListener('click', function () {
        yearBoxes.forEach(box => box.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// SE/TE/BE Level Selection
const levelButtons = document.querySelectorAll('.level-btn');
const sem1 = document.getElementById('sem1');
const sem2 = document.getElementById('sem2');

// Default selection is SE, which corresponds to Semesters 3 and 4
const updateSemesterDisplay = (level) => {
    let semYear = 0;

    switch (level) {
        case 'SE':
            semYear = 2;
            sem1.querySelector('h3').innerText = `Sem ${semYear + 1}`;
            sem2.querySelector('h3').innerText = `Sem ${semYear + 2}`;
            break;
        case 'TE':
            semYear = 4;
            sem1.querySelector('h3').innerText = `Sem ${semYear + 1}`;
            sem2.querySelector('h3').innerText = `Sem ${semYear + 2}`;
            break;
        case 'BE':
            semYear = 6;
            sem1.querySelector('h3').innerText = `Sem ${semYear + 1}`;
            sem2.querySelector('h3').innerText = `Sem ${semYear + 2}`;
            break;
        default:
            break;
    }
};

levelButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        levelButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        updateSemesterDisplay(this.getAttribute('data-level'));
    });
});

// Initialize semesters on page load
updateSemesterDisplay('SE');

// Pie Chart using Chart.js
const ctx = document.getElementById('levelChart').getContext('2d');
const levelChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Level 0', 'Level 1', 'Level 2'],
        datasets: [{
            label: 'Level Distribution',
            data: [30, 50, 20], // Random data, you can update this dynamically
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverOffset: 4
        }]
    }
});


// Pie Chart using Chart.js
const ctx2 = document.getElementById('levelChart2').getContext('2d');
const levelChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Level 0', 'Level 1', 'Level 2'],
        datasets: [{
            label: 'Level Distribution',
            data: [45, 25, 30], // Random data, you can update this dynamically
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverOffset: 4
        }]
    }
});
