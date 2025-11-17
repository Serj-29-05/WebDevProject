// This file handles the search functionality for browsing the menu.

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const menuItems = document.querySelectorAll('.menu-item');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        menuItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});