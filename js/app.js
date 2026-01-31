const form = document.getElementById('productForm');
const list = document.getElementById('productList');

let products = [];

// ================= FETCH API =================
const URL = 'http://localhost:3000/productos';

// GET
async function getProductsAPI() {
    try {
        const res = await fetch(URL);
        const data = await res.json();

        console.log('GET productos:', data);

        products = data;
        renderProducts();
        saveLocal(); // respaldo
    } catch (error) {
        console.error("Error al obtener productos", error);
    }
}

// POST
async function postProductAPI(product) {
    try {
        await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        getProductsAPI();
    } catch (error) {
        console.error("Error al crear producto", error);
    }
}

// DELETE
async function deleteProductoAPI(id) {
    try {
        await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        });

        getProductsAPI();
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
}

// ================= FORM =================
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();

    if (!name || !price) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const product = {
        name,
        price
    };

    postProductAPI(product);
    form.reset();
});

// ================= DOM =================
function renderProducts() {
    list.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;

        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';

        btn.addEventListener('click', () => {
            deleteProductoAPI(product.id);
        });

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// ================= LOCALSTORAGE =================
function saveLocal() {
    localStorage.setItem('products', JSON.stringify(products));
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', getProductsAPI);
