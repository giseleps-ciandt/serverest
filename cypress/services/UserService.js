const UserService = {
  list() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      failOnStatusCode: false,
    })
  },

  create(userData) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: userData,
      failOnStatusCode: false,
    })
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false,
    })
  },

  delete(id) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false,
    })
  },
}

module.exports = UserService
