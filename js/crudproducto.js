import Productos from "./producto.js";

export default class CrudProducto {

    crearProducto() {
        this.nombre = document.getElementById('nombre').value;
        this.precio = document.getElementById('precio').value;
        this.descripcion = document.getElementById('descripcion').value;
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        let productonorepetido = true;
        const ultimoid = datosProductos.length - 1;
        console.log(ultimoid);
        const id = ultimoid + 1;
        for (let i = 0; i < datosProductos.length; i++) {
            if (datosProductos[i].nombre === this.nombre) {
                productonorepetido = false;
                return alert("El producto ya existe");
                break;
            }
            if (datosProductos[i].descripcion === this.descripcion) {
                productonorepetido = false;
                return alert("La descripción del producto ya existe");
                break;
            }
        }
        if (productonorepetido === true) {
            const nuevoProducto = new Productos(id, this.nombre, this.precio, this.descripcion);
            datosProductos.push(nuevoProducto);
            localStorage.setItem('datosProductos', JSON.stringify(datosProductos));
            document.getElementById('nombre').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('descripcion').value = '';
            return this.mostrarInformacion();
        }
    }

    deleteProducto(id) {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const index = datosProductos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            datosProductos.splice(index, 1);
            localStorage.setItem('datosProductos', JSON.stringify(datosProductos));
            return this.mostrarInformacion();
        }
    }

    vistaproducto(id) {
        window.location.href = `editarProducto.html?id=${id}`;
    }

    editarProducto(idProducto) {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const id = parseInt(idProducto);
        const index = datosProductos.findIndex(producto => producto.id === id);
        console.log(index);
        if (index !== -1) {
            datosProductos.splice(index, 1);
            console.log("Producto eliminado:", datosProductos);
        }
        this.nombre = document.getElementById('nombre').value;
        this.precio = document.getElementById('precio').value;
        this.descripcion = document.getElementById('descripcion').value;
        const nuevoProducto = new Productos(id, this.nombre, this.precio, this.descripcion);
        console.log("Nuevo producto creado:", nuevoProducto);
        datosProductos.push(nuevoProducto);
        console.log("Producto agregado:", datosProductos);
        localStorage.setItem('datosProductos', JSON.stringify(datosProductos));
        window.location.href = 'crudproducto.html';
    }



    mostrarInformacion() {
        const datosProductos = JSON.parse(localStorage.getItem('datosProductos'));
        const tabla = document.getElementById('productTableBody');
        tabla.innerHTML = '';
        for (let i = 0; i < datosProductos.length; i++) {
            const fila = document.createElement('tr');
            const celdaId = document.createElement('td');
            const celdaNombre = document.createElement('td');
            const celdaPrecio = document.createElement('td');
            const celdaDescripcion = document.createElement('td');
            const botonEliminar = document.createElement('button');
            const botonEditar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => { this.deleteProducto(datosProductos[i].id); });
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', () => { this.vistaproducto(datosProductos[i].id); });
            celdaId.textContent = datosProductos[i].id;
            celdaNombre.textContent = datosProductos[i].nombre;
            celdaPrecio.textContent = `$${datosProductos[i].precio}`;
            celdaDescripcion.textContent = datosProductos[i].descripcion;
            fila.appendChild(celdaId);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaDescripcion);
            fila.appendChild(botonEliminar);
            fila.appendChild(botonEditar);
            tabla.appendChild(fila);
        }
    }
}