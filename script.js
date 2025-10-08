const tableBody = document.querySelector("#inventoryTable tbody");

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const stock = document.getElementById("itemStock").value;

  if (!name || stock <= 0) {
    alert("Please enter a valid item and stock!");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${stock}</td>
    <td>
      <button onclick="updateStock(this)">Update</button>
      <button onclick="removeItem(this)">Remove</button>
    </td>
  `;
  tableBody.appendChild(row);

  document.getElementById("itemName").value = "";
  document.getElementById("itemStock").value = "";
}

function removeItem(button) {
  button.parentElement.parentElement.remove();
}

function updateStock(button) {
  const row = button.parentElement.parentElement;
  const newStock = prompt("Enter new stock:", row.cells[1].innerText);
  if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
    row.cells[1].innerText = newStock;
  }
}
