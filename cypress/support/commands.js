Cypress.Commands.add('createUser', (overrides = {}) => {
  const ts = Date.now()
  return cy.fixture('users').then(({ userTemplate }) => {
    const userData = {
      ...userTemplate,
      email: `user.${ts}@serverest.dev`,
      ...overrides,
    }
    return cy
      .request('POST', `${Cypress.env('apiUrl')}/usuarios`, userData)
      .then((response) => ({ ...userData, _id: response.body._id }))
  })
})

Cypress.Commands.add('createAdminUser', (overrides = {}) => {
  return cy.createUser({ administrador: 'true', ...overrides })
})

Cypress.Commands.add('deleteUser', (id) => {
  return cy.request('DELETE', `${Cypress.env('apiUrl')}/usuarios/${id}`)
})

Cypress.Commands.add('loginApi', (email, password) => {
  return cy
    .request('POST', `${Cypress.env('apiUrl')}/login`, { email, password })
    .its('body.authorization')
})

Cypress.Commands.add('loginUI', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="senha"]').type(password)
  cy.get('[data-testid="entrar"]').click()
})
