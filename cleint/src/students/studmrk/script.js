const ctx = document.getElementById('coGraph').getContext('2d');

const coData = {
    labels: ['CO1', 'CO2', 'CO3'],
    datasets: [{
        label: 'Marks Progress',
        data: [4, 3, 8], // Example marks for Q1, Q2, Q3
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1
    }]
};

const coGraph = new Chart(ctx, {
    type: 'bar',
    data: coData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Marks'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Course Outcomes'
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
