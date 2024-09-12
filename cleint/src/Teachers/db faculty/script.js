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

// Toggle the visibility of the graph container
function toggleGraph() {
    const graphContainer = document.getElementById('graphContainer');
    if (graphContainer.style.display === 'none' || graphContainer.style.display === '') {
        graphContainer.style.display = 'block'; // Show the graph
    } else {
        graphContainer.style.display = 'none'; // Hide the graph
    }
}

// Pie Chart using Chart.js
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('levelChart').getContext('2d');
    const levelChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Level 0', 'Level 1', 'Level 2', 'Level 3'],
            datasets: [{
                label: 'Level Distribution',
                data: [10, 20, 30, 40],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });
});
