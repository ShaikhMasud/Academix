// Define the PO statements
const poStatements = {
    PO1: "Engineering Knowledge: Graduates should have a deep understanding of the fundamental principles, theories, and concepts in their chosen engineering field.",
    PO2: "Problem Solving: Graduates should be able to apply engineering knowledge to identify, formulate, and solve complex engineering problems.",
    PO3: "Design/development of solutions: Design solutions for complex engineering problems with societal, cultural, and environmental considerations.",
    PO4: "Conduct investigations of complex problems: Use research-based knowledge and methods to provide valid conclusions.",
    PO5: "Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.",
    PO6: "The engineer and society: Assess societal, health, safety, legal, and cultural issues relevant to professional engineering practice.",
    PO7: "Environment and sustainability: Understand the impact of professional engineering solutions in societal and environmental contexts.",
    PO8: "Ethics: Apply ethical principles and commit to professional ethics and responsibilities.",
    PO9: "Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams.",
    PO10: "Communication: Communicate effectively on complex engineering activities, including reports and presentations.",
    PO11: "Project management and finance: Apply engineering and management principles to one's work, as a member or leader in a team.",
    PO12: "Life-long learning: Recognize the need for independent and life-long learning in the broadest context of technological change."
};

// Tooltip functionality
document.querySelectorAll('.po-header').forEach(header => {
    header.addEventListener('mouseenter', event => {
        const po = event.target.dataset.po;
        const tooltip = document.getElementById('po-tooltip');
        tooltip.textContent = poStatements[po];
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY - 40}px`;
    });

    header.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById('po-tooltip');
        tooltip.style.display = 'none';
    });
});




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