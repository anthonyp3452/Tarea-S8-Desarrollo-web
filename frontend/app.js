const API_URL = 'http://localhost:3000';

// DOM Elements
const productForm = document.getElementById('productForm');
const productsBody = document.getElementById('productsBody');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const noProducts = document.getElementById('noProducts');
const productsTable = document.getElementById('productsTable');

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Handle form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);

    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, precio })
        });

        const data = await response.json();

        if (response.ok) {
            // Clear form
            productForm.reset();
            
            // Reload products
            await loadProducts();
            
            // Show success message
            showMessage('Producto agregado exitosamente', 'success');
        } else {
            showError('Error al agregar el producto: ' + (data.error || data.message));
        }
    } catch (err) {
        showError('Error de conexión con el servidor: ' + err.message);
    }
});

// Load products from API
async function loadProducts() {
    loading.style.display = 'block';
    productsTable.style.display = 'none';
    noProducts.style.display = 'none';
    error.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();

        if (response.ok && data.products) {
            displayProducts(data.products);
        } else {
            showError('Error al cargar productos: ' + (data.error || ''));
        }
    } catch (err) {
        showError('Error de conexión con el servidor: ' + err.message);
    } finally {
        loading.style.display = 'none';
    }
}

// Display products in the table
function displayProducts(products) {
    if (products.length === 0) {
        noProducts.style.display = 'block';
        productsTable.style.display = 'none';
        return;
    }

    productsTable.style.display = 'table';
    noProducts.style.display = 'none';
    productsBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${escapeHtml(product.nombre)}</td>
            <td>$${parseFloat(product.precio).toFixed(2)}</td>
            <td>${formatDate(product.created_at)}</td>
            <td>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    Eliminar
                </button>
            </td>
        `;
        productsBody.appendChild(row);
    });
}

// Delete a product
async function deleteProduct(id) {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            // Reload products
            await loadProducts();
            showMessage('Producto eliminado exitosamente', 'success');
        } else {
            showError('Error al eliminar el producto: ' + (data.error || ''));
        }
    } catch (err) {
        showError('Error de conexión con el servidor: ' + err.message);
    }
}

// Helper functions
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error';
    messageDiv.textContent = message;
    
    const formSection = document.querySelector('.form-section');
    formSection.insertBefore(messageDiv, formSection.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


