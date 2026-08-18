const HomePage = require('../../pages/HomePage')
const LoginPage = require('../../pages/LoginPage')

describe('Home: Authenticated user actions', () => {
  let adminUser

  before(() => {
    cy.createAdminUser().then((user) => {
      adminUser = user
    })
  })

  after(() => {
    cy.deleteUser(adminUser._id)
  })

  beforeEach(() => {
    cy.session(
      'adminSession',
      () => {
        cy.loginUI(adminUser.email, adminUser.password)
        cy.url().should('include', '/home')
      },
      { cacheAcrossSpecs: false }
    )
    HomePage.visit()
  })

  it('should logout and redirect to login page', () => {
    HomePage.logout()

    cy.url().should('include', '/login')
    LoginPage.submitButton.should('be.visible')
  })
})
