const ProductService = {
  list() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`,
      failOnStatusCode: false,
    })
  },

  create(productData, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      ...(token && { headers: { Authorization: token } }),
      body: productData,
      failOnStatusCode: false,
    })
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      failOnStatusCode: false,
    })
  },

  delete(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    })
  },
}

module.exports = ProductService
