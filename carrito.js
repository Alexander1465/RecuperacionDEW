export default class Carrito {
    constructor(id, producto, cantidad, precio) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    agregarProductoCarrito(idProducto) {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const producto = datosProductos.find(producto => producto.id === idProducto);
        let productoEnCarrito = undefined
        if (producto) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const ultimoid = carrito.length - 1;
            const id = ultimoid + 1;
            const precio = producto.precio;
            productoEnCarrito = carrito.find(item => item.producto.id === idProducto);
            if (productoEnCarrito === undefined) {
                console.log(producto);
                carrito.push(new Carrito(id, producto, 1, precio));
            } else {
                productoEnCarrito.cantidad += 1;
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));

            this.mostrarCarrito();

        } else {
            return this.mostrarCarrito();
        }
    }

    deleteProductoCarrito(idProducto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carrito.findIndex(item => item.id === idProducto);
        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return this.mostrarCarrito();
        }
    }

    vaciarCarrito() {
        localStorage.removeItem('carrito');
        return this.mostrarCarrito();
    }

    aumentarCantidad(idProducto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoEnCarrito = carrito.find(item => item.id === idProducto);
        if (productoEnCarrito) {
            console.log(productoEnCarrito);
            productoEnCarrito.cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return this.mostrarCarrito();
        }
    }

    disminuirCantidad(idProducto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoEnCarrito = carrito.find(item => item.id === idProducto);
        if (productoEnCarrito.cantidad === 1) {
            return this.deleteProductoCarrito(idProducto);
        } else {
            productoEnCarrito.cantidad -= 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return this.mostrarCarrito();
        }
    }

    finalizarCompra() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const verificacion = confirm("¿Deseas finalizar la compra?");
        if (verificacion) {
            localStorage.removeItem('carrito');
            this.mostrarCarrito();
            alert("Compra finalizada");
        }
    }

    mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const divCarrito = document.getElementById('divcarrito');
        divCarrito.innerHTML = '';
        for (let i = 0; i < carrito.length; i++) {
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            h3.textContent = carrito[i].producto.nombre;
            const p = document.createElement('p');
            p.textContent = `Precio: ${carrito[i].precio}`;
            const p2 = document.createElement('p');
            p2.textContent = `Cantidad: ${carrito[i].cantidad}`;
            const botonAumentar = document.createElement('button');
            botonAumentar.textContent = '+';
            botonAumentar.addEventListener('click', () => { this.aumentarCantidad(carrito[i].id); });
            const botonDisminuir = document.createElement('button');
            botonDisminuir.textContent = '-';
            botonDisminuir.addEventListener('click', () => { this.disminuirCantidad(carrito[i].id); });
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => { this.deleteProductoCarrito(carrito[i].id); });
            div.appendChild(h3);
            div.appendChild(p);
            div.appendChild(p2);
            div.appendChild(botonAumentar);
            div.appendChild(botonDisminuir);
            div.appendChild(botonEliminar);
            divCarrito.appendChild(div);
        }
        const divBoton = document.createElement('div');
        if (carrito.length > 0) {
            const botonComprar = document.createElement('button');
            botonComprar.textContent = 'Comprar';
            botonComprar.addEventListener('click', () => { this.finalizarCompra(); });
            const botonVaciar = document.createElement('button');
            botonVaciar.textContent = 'Vaciar Carrito';
            botonVaciar.addEventListener('click', () => { this.vaciarCarrito(); });
            divBoton.appendChild(botonComprar);
            divBoton.appendChild(botonVaciar);
            divCarrito.appendChild(divBoton);
        }
    }

}