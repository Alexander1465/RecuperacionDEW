import Productos from "./producto.js";
document.getElementById('loginusuario').addEventListener('submit', (e) => {
    e.preventDefault()
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    login(nombre, password);

});

async function login(nombre, password) {
    let id = null;
    try {
        const respuesta = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: nombre,
                password: password,
                expiresInMins: 30,
            }),
        });

        if (!respuesta.ok) {
            alert('Usuario Erroneo');
            throw new Error('Error en la solicitud de login');
            return;
        }

        const datos = await respuesta.json();

        let id = datos.id;

        const usuario = await fetch(`https://dummyjson.com/users/${id}`);
        if (!usuario.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const datosUsuario = await usuario.json();
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

        const datosProductos = [];
        const productos = await fetch('https://dummyjson.com/products');

        if (!productos.ok) {
            throw new Error('Error en la solicitud de productos');
        }

        const productosfetch = await productos.json();
        for (let i = 0; i < productosfetch.products.length; i++) {
            datosProductos.push(new Productos(productosfetch.products[i].id, productosfetch.products[i].title, productosfetch.products[i].price, productosfetch.products[i].description,));
        }

        localStorage.setItem('datosProductos', JSON.stringify(datosProductos));
        window.location.href = '../page/principal.html';

    } catch (error) {
        console.error('Error con el inicio de sesión:', error);
    }
}

