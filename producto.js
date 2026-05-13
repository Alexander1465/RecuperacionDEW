import Carrito from "./carrito.js";

export default class Productos {
    constructor(id, nombre, precio, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    obtenerProductoPorId(id) {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const producto = datosProductos.find(producto => producto.id === id);
        return producto;
    }

    mostrarproducto() {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const div = document.getElementById('product');
        div.innerHTML = '';
        for (let i = 0; i < datosProductos.length; i++) {
            const div1 = document.createElement('div');
            div1.classList.add('productos');
            const h3 = document.createElement('h3');
            h3.textContent = datosProductos[i].nombre;
            const p = document.createElement('p');
            p.textContent = `Precio: ${datosProductos[i].precio}`;
            const p2 = document.createElement('p');
            p2.textContent = `Descripción: ${datosProductos[i].descripcion}`;
            const buttonEditar = document.createElement('button');
            buttonEditar.textContent = 'Añadir Producto';
            const carritoadd = new Carrito();
            buttonEditar.addEventListener('click', () => { carritoadd.agregarProductoCarrito(datosProductos[i].id); });
            div1.appendChild(h3);
            div1.appendChild(p);
            div1.appendChild(p2);
            div1.appendChild(buttonEditar);
            div.appendChild(div1);
        }

    }



}
