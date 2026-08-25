const LoginPage = require('../../pages/LoginPage')
const HomePage = require('../../pages/HomePage')

describe('@frontend @login Login: User Authentication', () => {
  let testUser
  let fixtures

  before(() => {
    cy.fixture('users').then((data) => {
      fixtures = data
    })
    cy.createUser({ administrador: 'true' }).then((user) => {
      testUser = user
    })
  })

  after(() => {
    cy.deleteUser(testUser._id)
  })

  beforeEach(() => {
    LoginPage.visit()
  })

  it('should authenticate with valid credentials and redirect to home', () => {
    LoginPage.login(testUser.email, testUser.password)

    cy.url().should('include', '/home')
    HomePage.logoutButton.should('be.visible')
  })

  it('should display error alert when logging in with wrong password', () => {
    LoginPage.login(testUser.email, fixtures.invalidLogin.password)

    LoginPage.errorAlert.should('be.visible')
    cy.url().should('include', '/login')
  })

  it('should display error alert when logging in with unregistered email', () => {
    LoginPage.login(fixtures.invalidLogin.email, fixtures.invalidLogin.password)

    LoginPage.errorAlert.should('be.visible')
    cy.url().should('include', '/login')
  })
})
