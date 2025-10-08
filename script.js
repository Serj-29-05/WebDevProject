const tableBody = document.querySelector("#inventoryTable tbody");

function saveInventory() {
  const items = [];
  tableBody.querySelectorAll("tr").forEach(row => {
    items.push({
      name: row.cells[0].innerText,
      stock: row.cells[1].innerText
    });
  });
  localStorage.setItem("inventoryItems", JSON.stringify(items));
}

function loadInventory() {
  const items = JSON.parse(localStorage.getItem("inventoryItems") || "[]");
  tableBody.innerHTML = "";
  const loggedInUser = localStorage.getItem("loggedInUser");
  const isAdmin = loggedInUser === "admin";

  document.getElementById("actionHeader").style.display = isAdmin ? "table-cell" : "none";
  document.getElementById("adminForm").style.display = isAdmin ? "block" : "none";
  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.stock}</td>
      <td class="action-cell">${isAdmin ? `<button onclick="updateStock(this)">Update</button> <button onclick="removeItem(this)">Remove</button>` : ""}</td>
    `;
    if (!isAdmin) row.querySelector('.action-cell').classList.add('user-hide');
    tableBody.appendChild(row);
  });
}

window.addEventListener("DOMContentLoaded", loadInventory);


function addItem() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser !== "admin") {
    alert("Only admin can add items.");
    return;
  }
  const name = document.getElementById("itemName").value.trim();
  const stock = document.getElementById("itemStock").value;

  if (!name || stock <= 0) {
    alert("Please enter a valid item and stock!");
    return;
  }


  const items = JSON.parse(localStorage.getItem("inventoryItems") || "[]");
  items.push({ name, stock });
  localStorage.setItem("inventoryItems", JSON.stringify(items));

  document.getElementById("itemName").value = "";
  document.getElementById("itemStock").value = "";
  loadInventory();
}


function removeItem(button) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser !== "admin") {
    alert("Only admin can remove items.");
    return;
  }
  const row = button.parentElement.parentElement;
  row.classList.add('fade-out');
  setTimeout(() => {
    row.remove();
    saveInventory();
    loadInventory();
  }, 500);
}

function updateStock(button) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser !== "admin") {
    alert("Only admin can update stock.");
    return;
  }
  const row = button.parentElement.parentElement;
  const newStock = prompt("Enter new stock:", row.cells[1].innerText);
  if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
    row.cells[1].innerText = newStock;
    row.classList.add('highlight');
    setTimeout(() => row.classList.remove('highlight'), 1000);
    saveInventory();
    setTimeout(loadInventory, 1000); // allow highlight to show before reload
  }
}

// --- Login System ---
const validUsers = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" }
];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = validUsers.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", username);
    showInventory();
    document.getElementById("loginError").style.display = "none";
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  showLogin();
}

function showInventory() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("inventorySection").style.display = "block";
  loadInventory();
}

function showLogin() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("inventorySection").style.display = "none";
}

window.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("loggedInUser")) {
    showInventory();
  } else {
    showLogin();
  }

  setTimeout(() => {
    const loginSection = document.getElementById("loginSection");
    if (loginSection) loginSection.classList.add("visible");
  }, 100);
});

