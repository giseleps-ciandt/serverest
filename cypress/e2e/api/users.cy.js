const UserService = require('../../services/UserService')

describe('API Users: User management (/usuarios)', () => {
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

  it('should create new user successfully and return ID (201)', () => {
    const ts = Date.now()
    const newUserData = {
      ...fixtures.userTemplate,
      email: `api.${ts}@serverest.dev`,
    }

    UserService.create(newUserData).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id').and.to.be.a('string')

      cy.deleteUser(response.body._id)
    })
  })

  it('should return 400 when trying to register an existing email', () => {
    UserService.create({
      ...fixtures.userTemplate,
      email: existingUser.email,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message', 'Este email já está sendo usado')
    })
  })

  it('should return complete user data when fetching by ID (200)', () => {
    UserService.getById(existingUser._id).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('_id', existingUser._id)
      expect(response.body).to.have.property('email', existingUser.email)
      expect(response.body).to.have.property('nome', existingUser.nome)
      expect(response.body).to.have.property('administrador', existingUser.administrador)
    })
  })

  it('should return 400 when creating user without required fields', () => {
    UserService.create({}).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('nome')
    })
  })
})
