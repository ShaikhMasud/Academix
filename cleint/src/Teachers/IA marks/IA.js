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


//table js

function uploadExcel() {
    var fileUpload = document.getElementById("fileUpload");
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        populateTable(jsonData);
    };

    if (fileUpload.files.length > 0) {
        reader.readAsArrayBuffer(fileUpload.files[0]);
    } else {
        alert("Please upload an Excel file.");
    }
}

function populateTable(data) {
    var tableBody = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";  // Clear existing table data

    // Populate the table
    for (var i = 1; i < data.length; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < data[i].length; j++) {
            var cell = document.createElement("td");
            cell.textContent = data[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}

