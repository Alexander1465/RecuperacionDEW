describe('Iniciar sesion', () => {
  it('Debería iniciar sesión con éxito', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
  })
})
describe('Agregar al carrito', () => {
  it('Debería agregar un producto al carrito', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(6000)
    cy.get('button').contains('Añadir Producto').first().click()
    cy.wait(6000)
  })
})

describe('Prueba de Carrito de Compras', () => {
  it('Debería mostrar el carrito de compras con los productos añadidos', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(6000)
    cy.get('button').contains('Añadir Producto').first().click()
    cy.wait(6000)
    cy.get('button').contains('Comprar').click()
  })
})

describe('Vista Chart', () => {
  it('Debería mostrar la vista de Chart', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(6000)
    cy.get('li').contains('Gráfica').click()
    cy.wait(6000)
  })
})

describe('Agregar un producto en el crud de productos', () => {
  it('Debería agregar un nuevo producto', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(4000)
    cy.get('li').contains('Crud Productos').click()
    cy.wait(4000)
    cy.get('input[placeholder="Nombre"]').type('Producto de prueba')
    cy.get('input[placeholder="Precio"]').type('100')
    cy.get('input[placeholder="Descripción"]').type('Descripción de prueba')
    cy.get('button').contains('Agregar').click()
    cy.scrollTo('bottom')
    cy.wait(4000)
  })
})

describe('Editar un producto en el crud de productos', () => {
  it('Debería editar un producto existente', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(4000)
    cy.get('li').contains('Crud Productos').click()
    cy.wait(4000)
    cy.get('button').contains('Editar').first().click()
    cy.wait(4000)
    cy.get('input[placeholder="Nombre"]').clear().type('Producto editado')
    cy.get('input[placeholder="Precio"]').clear().type('150')
    cy.get('input[placeholder="Descripción"]').clear().type('Descripción editada')
    cy.get('button').contains('Editar').click()
    cy.wait(4000)
    cy.scrollTo('bottom')
    cy.wait(4000)
  })
})

describe('Eliminar un producto en el crud de productos', () => {
  it('Debería eliminar un producto existente', () => {
    cy.visit('http://127.0.0.1:5500/page/login.html')
    cy.get('#nombre').type('emilys')
    cy.get('#password').type('emilyspass')
    cy.get('button[type="submit"]').click()
    cy.wait(4000)
    cy.get('li').contains('Crud Productos').click()
    cy.wait(4000)
    cy.get('button').contains('Eliminar').first().click()
    cy.wait(4000)
  })
})








  