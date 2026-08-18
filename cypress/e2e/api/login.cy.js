const AuthService = require('../../services/AuthService')

describe('API Login: Authentication and token generation (POST /login)', () => {
  let testUser
  let fixtures

  before(() => {
    cy.fixture('users').then((data) => {
      fixtures = data
    })
    cy.createUser().then((user) => {
      testUser = user
    })
  })

  after(() => {
    cy.deleteUser(testUser._id)
  })

  it('should return authorization token with valid credentials (200)', () => {
    AuthService.login(testUser.email, testUser.password).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message', 'Login realizado com sucesso')
      expect(response.body).to.have.property('authorization')
      expect(response.body.authorization).to.match(/^Bearer /)
    })
  })

  it('should return 401 when authenticating with wrong password', () => {
    AuthService.login(testUser.email, fixtures.invalidLogin.password).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
    })
  })

  it('should return 401 when authenticating with unregistered email', () => {
    AuthService.login(fixtures.invalidLogin.email, fixtures.invalidLogin.password).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
    })
  })
})
