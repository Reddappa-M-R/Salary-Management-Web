<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salary Management Plan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Salary Management Plan</h1>
        
        <!-- Fetch and Create Needs Section -->
        <div>
            <button id="fetchNeedsBtn">Fetch Needs</button>
            <button id="createNeedsBtn">Create Need</button>
        </div>
        <div id="needsResponse" class="response"></div>
        <table id="needsTable">
            <thead>
                <tr><th>Need</th><th>Amount</th><th>Date</th></tr>
            </thead>
            <tbody id="needsTableBody"></tbody>
        </table>
        
        <!-- Other sections (Desires, Investments, Salary) can be added similarly -->

    </div>
    <script src="app.js"></script>
</body>
</html>
