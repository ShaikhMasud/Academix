const ctx = document.getElementById('graphCanvas').getContext('2d');
let graph;

// PO Data
const poData = {
    labels: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
    datasets: [{
        label: 'Performance',
        data: [8, 7, 9, 6, 7, 8, 9, 6, 7, 8, 9, 7],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
    }]
};

// CO Data
const coData = {
    labels: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'],
    datasets: [{
        label: 'Marks Progress',
        data: [4, 3, 5, 2, 4, 3],
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1
    }]
};

function renderGraph(data, title) {
    if (graph) {
        graph.destroy(); // Destroy previous graph instance
    }

    graph = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Scores'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false // Disable default tooltip
                }
            }
        }
    });
}

// Show the PO graph on page load
window.onload = function() {
    renderGraph(poData, 'Program Outcomes');
};

// Function to switch to CO graph
function showCOGraph() {
    renderGraph(coData, 'Course Outcomes');
}

// Add event listeners to subject buttons
const subjectCards = document.querySelectorAll('.subject-card');
subjectCards.forEach(card => {
    card.addEventListener('click', showCOGraph);
});

// Custom tooltip for graph
const tooltip = document.getElementById('tooltip');

ctx.canvas.addEventListener('mousemove', function (event) {
    const points = graph.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
    if (points.length) {
        const index = points[0].index;
        const descriptions = graph.data.labels.map((label, i) => {
            if (graph.data.datasets[0].data.length === 12) {
                return `PO${i + 1}: Description for Program Outcome ${i + 1}.`;
            } else {
                return `CO${i + 1}: Description for Course Outcome ${i + 1}.`;
            }
        });

        tooltip.innerHTML = `<strong>${graph.data.labels[index]}</strong>: ${descriptions[index]}`;
        tooltip.style.display = 'block';
        tooltip.style.left = event.offsetX + 10 + 'px';
        tooltip.style.top = event.offsetY + 10 + 'px';
    } else {
        tooltip.style.display = 'none';
    }
});

ctx.canvas.addEventListener('mouseout', function () {
    tooltip.style.display = 'none';
});
