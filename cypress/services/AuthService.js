const AuthService = {
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: { email, password },
      failOnStatusCode: false,
    })
  },
}

module.exports = AuthService
