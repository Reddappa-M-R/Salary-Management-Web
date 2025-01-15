let currentPage = 0;  // To track which page of data we're currently displaying
const rowsPerPage = 10; 
// Function to fetch data for a specific type (needs, desires, investment, salary)
function fetchData(type) {
    const responseDiv = document.getElementById(`${type}Response`);
    const table = document.getElementById(`${type}Table`);
    const tableBody = document.getElementById(`${type}TableBody`);
    const showMoreBtn = document.getElementById('showMoreBtn');

    // Clear previous content and show loading message
    responseDiv.style.display = 'block';
    table.style.display = 'none';  // Hide table while loading
    responseDiv.innerHTML = 'Loading...';
    responseDiv.classList.remove('success', 'error');  // Reset previous classes

    // Fetch data from the server based on the type
    fetch(`http://localhost:8000/${type}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Successfully fetched data
            if (data.status_code === 200 && data.data.length > 0) {
                // Show success message
                responseDiv.innerHTML = 'Data fetched successfully!';
                responseDiv.classList.add('success');

                // Display the data in the table
                table.style.display = 'table';
                tableBody.innerHTML = ''; // Clear previous rows

                const start = currentPage * rowsPerPage;
                const end = start + rowsPerPage;
                const limitedData = data.data.slice(start, end);

                limitedData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.Needs || item.Desires || item.Investment || item.Salary}</td>
                        <td>${item.amount}</td>
                        <td>${new Date(item.date).toLocaleString()}</td>
                    `;
                    tableBody.appendChild(row);
                });
                 // Increment the page number
                 currentPage++;

                 // If there are more data, show the "Show More" button
                 if (data.data.length > currentPage * rowsPerPage) {
                     showMoreBtn.style.display = 'block';
                 } else {
                     showMoreBtn.style.display = 'none'; // Hide the button if no more data
                 }
            } else {
                responseDiv.innerHTML = 'No data available.';
                responseDiv.classList.add('error');
            }
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching data:', error);
            responseDiv.innerHTML = `Error: ${error.message}`;
            responseDiv.classList.add('error');
        });
}

// Function to send POST request to create new data
function createData(type, data) {
    fetch(`http://localhost:8000/${type}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status_code === 200) {
            alert(`${type} created successfully!`);
            fetchData(type); // Re-fetch the data to update the table
        } else {
            alert(`Error creating ${type}: ${data.message}`);
        }
    })
    .catch(error => {
        console.error(`Error creating ${type}:`, error);
        alert(`Error creating ${type}: ${error.message}`);
    });
}
// Event listener for the Show More button
// document.getElementById('showMoreBtn').addEventListener('click', () => {
//     fetchData('needs');  // Call the fetchData function to load more data
// });
// Add event listeners for each type of data fetch and creation
document.getElementById('fetchNeedsBtn').addEventListener('click', () => fetchData('needs'));
document.getElementById('createNeedsBtn').addEventListener('click', () => {
    document.getElementById('createNeedsForm').style.display = 'block';
});

document.getElementById('submitCreateNeedsBtn').addEventListener('click', () => {
    const need = document.getElementById('needs').value;
    const amount = document.getElementById('needsAmount').value;
    createData('needs', { Needs: need, amount: amount });
    document.getElementById('createNeedsForm').style.display = 'none';  // Hide form after submission
});

document.getElementById('fetchDesiresBtn').addEventListener('click', () => fetchData('desires'));
document.getElementById('createDesiresBtn').addEventListener('click', () => {
    document.getElementById('createDesiresForm').style.display = 'block';
});

document.getElementById('submitCreateDesiresBtn').addEventListener('click', () => {
    const desire = document.getElementById('desires').value;
    const amount = document.getElementById('desiresAmount').value;
    createData('desires', { Desires: desire, amount: amount });
    document.getElementById('createDesiresForm').style.display = 'none';  // Hide form after submission
});

document.getElementById('fetchInvestmentsBtn').addEventListener('click', () => fetchData('investments'));
document.getElementById('createInvestmentsBtn').addEventListener('click', () => {
    document.getElementById('createInvestmentsForm').style.display = 'block';
});

document.getElementById('submitCreateInvestmentsBtn').addEventListener('click', () => {
    const investment = document.getElementById('investments').value;
    const amount = document.getElementById('investmentsAmount').value;
    createData('investments', { Investment: investment, amount: amount });
    document.getElementById('createInvestmentsForm').style.display = 'none';  // Hide form after submission
});

document.getElementById('fetchSalaryBtn').addEventListener('click', () => fetchData('salary'));
document.getElementById('createSalaryBtn').addEventListener('click', () => {
    document.getElementById('createSalaryForm').style.display = 'block';
});

document.getElementById('submitCreateSalaryBtn').addEventListener('click', () => {
    const salary = document.getElementById('salary').value;
    const amount = document.getElementById('salaryAmount').value;
    createData('salary', { Salary: salary, amount: amount });
    document.getElementById('createSalaryForm').style.display = 'none';  // Hide form after submission
});

// Function to show the success modal
function showSuccessModal(message) {
    const modal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    
    // Set the success message and display the modal
    successMessage.innerHTML = message;
    modal.style.display = "block";

    // Close the modal when the user clicks on the "x"
    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal if the user clicks outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Automatically hide the modal after 3 seconds
    setTimeout(function() {
        modal.style.display = "none";
    }, 3000);
}

// Modified createData function to show success modal
function createData(type, data) {
    fetch(`http://localhost:8000/${type}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status_code === 200) {
            // Show success pop-up with green color
            showSuccessModal(`${type} created successfully!`);
            fetchData(type); // Re-fetch the data to update the table
        } else {
            alert(`Error creating ${type}: ${data.message}`);
        }
    })
    .catch(error => {
        console.error(`Error creating ${type}:`, error);
        alert(`Error creating ${type}: ${error.message}`);
    });
}

