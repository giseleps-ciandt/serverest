const RegisterPage = require('../../pages/RegisterPage')
const LoginPage = require('../../pages/LoginPage')

describe('Registration: New User Registration', () => {
  let existingUser
  let fixtures

  before(() => {
    cy.fixture('users').then((data) => {
      fixtures = data
    })
    cy.createUser().then((user) => {
      existingUser = user
    })
  })

  after(() => {
    cy.deleteUser(existingUser._id)
  })

  it('should navigate to registration page from login', () => {
    LoginPage.visit()
    LoginPage.goToRegister()

    cy.url().should('include', '/cadastrarusuarios')
  })

  it('should register new user successfully and redirect to home', () => {
    const ts = Date.now()
    const newUser = {
      ...fixtures.userTemplate,
      email: `new.user.${ts}@serverest.dev`,
    }

    RegisterPage.visit()
    RegisterPage.register(newUser)

    cy.url().should('include', '/home')
  })

  it('should display error alert when trying to register an existing email', () => {
    RegisterPage.visit()
    RegisterPage.register({
      ...fixtures.userTemplate,
      email: existingUser.email,
    })

    RegisterPage.errorAlert
      .should('be.visible')
      .and('contain', 'Este email já está sendo usado')
  })
})
