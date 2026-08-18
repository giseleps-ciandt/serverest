const ProductService = require('../../services/ProductService')

describe('API Products: Product management with authentication (/produtos)', () => {
  let adminUser
  let authToken
  let createdProductId
  let fixtures

  before(() => {
    cy.fixture('products').then((data) => {
      fixtures = data
    })
    cy.createAdminUser().then((user) => {
      adminUser = user
      cy.loginApi(user.email, user.password).then((token) => {
        authToken = token
      })
    })
  })

  after(() => {
    if (createdProductId) {
      ProductService.delete(createdProductId, authToken)
    }
    cy.deleteUser(adminUser._id)
  })

  it('should create product with valid authentication token (201)', () => {
    const ts = Date.now()
    const productData = {
      ...fixtures.productTemplate,
      nome: `${fixtures.productTemplate.nome} ${ts}`,
    }

    ProductService.create(productData, authToken).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id').and.to.be.a('string')
      createdProductId = response.body._id
    })
  })

  it('should list all available products (200)', () => {
    ProductService.list().then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('quantidade').and.to.be.a('number')
      expect(response.body).to.have.property('produtos').and.to.be.an('array')
    })
  })

  it('should return 401 when creating product without authentication token', () => {
    ProductService.create({
      ...fixtures.productTemplate,
      nome: 'Product Without Auth',
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})
