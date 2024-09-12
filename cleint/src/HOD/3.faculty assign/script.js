// List of teachers (predefined)
const teachers = [
    "Tayyab Sir", "Uday Sir", "Prasad Sir", "Jhanvi Maam", 
    "Aruna Maam", "Vaishali Maam", "Nilesh Sir", "Sunantha Maam",
    "Shiv Sir", "Mrudul Maam", "Teacher 11", "Teacher 12",
    "Teacher 13", "Teacher 14", "Teacher 15", "Teacher 16",
    "Teacher 17", "Teacher 18", "Teacher 19", "Teacher 20"
];

// Subject data
const subjects = [
    { code: 'ITM301', course: 'Mini Project - 1 A for Front end /backend Application using JAVA', faculty: 'Tayyab Sir', type: 'lab' },
    { code: 'ITL304', course: 'Java Lab', faculty: 'Prasad Sir', type: 'lab' },
    { code: 'ITL303', course: 'Computer Programming Paradigms Lab', faculty: 'Uday Sir', type: 'lab' },
    { code: 'ITL302', course: 'SQL Lab', faculty: 'Jhanvi Maam', type: 'lab' },
    { code: 'ITL301', course: 'Data Structure Lab', faculty: 'Aruna Maam', type: 'lab' },
    { code: 'ITC305', course: 'Paradigms and Computer Programming Fundamentals', faculty: 'Vaishali Maam', type: 'theory' },
    { code: 'ITC304', course: 'Principle of Communication', faculty: 'Nilesh Sir', type: 'theory' },
    { code: 'ITC303', course: 'Database Management System', faculty: 'Shiv Sir', type: 'theory' },
    { code: 'ITC302', course: 'Data Structure and Analysis', faculty: 'Mrudul Maam', type: 'theory' },
    { code: 'ITC301', course: 'Engineering Mathematics-III', faculty: 'Sunantha Maam', type: 'theory' }
];


// Function to generate table rows
function generateTable(filteredSubjects = subjects) {
    const tableBody = document.getElementById('assignmentTable');
    tableBody.innerHTML = ''; // Clear previous data
    filteredSubjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.course}</td>
            <td>
                <select id="faculty-${index}">
                    ${teachers.map(teacher => 
                        `<option value="${teacher}" ${teacher === subject.faculty ? 'selected' : ''}>${teacher}</option>`
                    ).join('')}
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter functionality
document.getElementById('allFilter').addEventListener('click', () => {
    generateTable(subjects);
});

document.getElementById('theoryFilter').addEventListener('click', () => {
    const theorySubjects = subjects.filter(subject => subject.type === 'theory');
    generateTable(theorySubjects);
});

document.getElementById('labFilter').addEventListener('click', () => {
    const labSubjects = subjects.filter(subject => subject.type === 'lab');
    generateTable(labSubjects);
});

// Excel Upload and Parse
document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('excelUpload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelData = XLSX.utils.sheet_to_json(firstSheet);
            // Update subjects based on Excel data
            subjects = excelData.map(item => ({
                code: item['Subject Code'],
                course: item['Course'],
                faculty: item['Faculty'],
                type: item['Type'] // Assuming 'Type' column defines 'theory' or 'lab'
            }));
            generateTable();
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload an Excel file!');
    }
});

// Initial table generation
generateTable();
