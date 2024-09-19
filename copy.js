// copy.js 

// Initial Data 
let tableEntries = [];

// Load existing entries from localStorage
const localStorageTransactions = JSON.parse(localStorage.getItem('tableEntries'));
if (localStorageTransactions) {
    tableEntries = localStorageTransactions;
    updateTable(); // Update the table with the loaded entries
}

// Function to update data expense summary 
function updateSummary() { 
	let totalIncome = tableEntries.reduce((t, e) => { 
		if (e.type === 1) t += e.amount; 
		return t; 
	}, 0); 
	let totalExpense = tableEntries.reduce((ex, e) => { 
		if (e.type === 0) ex += e.amount; 
		return ex; 
	}, 0); 
	updatedInc.innerText = totalIncome; 
	updatedExp.innerText = totalExpense; 
	updatedBal.innerText = totalIncome - totalExpense; 
} 

function logout() {
    // Clear login information from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the login page
    window.location.href = "index.html";
}


function addItem() { 
    let type = itemType.value; 
    let name = document.getElementById("name"); 
    let amount = document.getElementById("amount");
    let date = document.getElementById("date");

    // Input validation 
    if (name.value === "" || Number(amount.value) === 0 || date.value === "") 
        return alert("Incorrect Input"); 
    if (Number(amount.value) <= 0) 
        return alert("Incorrect amount! can't add negative");

    // Check if the entry already exists (based on name)
    const existingEntry = tableEntries.find(entry => entry.name === name.value);

    if (existingEntry) {
        // Update the existing entry instead of adding a new one
        existingEntry.type = Number(type);
        existingEntry.amount = Number(amount.value);
        existingEntry.date = date.value;
    } else {
        // Push new data 
        tableEntries.push({ 
            type: Number(type), 
            name: name.value, 
            amount: Number(amount.value), 
            date: date.value,
        });
    }

    updateTable(); 
    name.value = ""; 
    amount.value = 0; 
    date.value = ""; // Clear the date input after adding the item
    saveToLocalStorage(); // Save the updated entries to localStorage
} 
// copy.js

// ...

// Function to load all entry in the expense table 
function loadItems(e, i) { 
    let cls; 

    let table = document.getElementById("table"); 
    let row = table.insertRow(i + 1); 
    let cell0 = row.insertCell(0); 
    let cell1 = row.insertCell(1); 
    let cell2 = row.insertCell(2); 
    let cell3 = row.insertCell(3); // Modified for Date
    let c4 = row.insertCell(4); 
    cell0.innerHTML = i + 1; 
    cell1.innerHTML = e.name; 
    cell2.innerHTML = e.amount; 
    cell3.innerHTML = formatDate(e.date); // Display formatted date
    c4.innerHTML = "☒"; 
    c4.classList.add("zoom"); 
    c4.addEventListener("click", () => del(e)); 
    
    cell3.style.color = cls; 
} 

// Function to format the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}

// ...

// Clear the table before updation 
function remove() { 
	while (table.rows.length > 1) table.deleteRow(-1); 
} 

// Function to delete a specific entry 
function del(el) { 
	remove(); 
	tableEntries = tableEntries.filter( 
		(e) => e.name !== el.name 
	); 
	tableEntries.map((e, i) => loadItems(e, i)); 
	updateSummary(); 
}
function saveToLocalStorage() {
    localStorage.setItem('tableEntries', JSON.stringify(tableEntries));
} 

// To render all entries 
function updateTable() { 
	remove(); 
	tableEntries.map((e, i) => { 
		loadItems(e, i); 
	}); 
	updateSummary(); 
} 

updateTable();
