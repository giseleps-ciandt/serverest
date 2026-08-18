const ProductsPage = require('../../pages/ProductsPage')
const HomePage = require('../../pages/HomePage')

describe('Products: Catalog View', () => {
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
      {
        cacheAcrossSpecs: false,
      }
    )
    HomePage.visit()
  })

  it('should display product list after successful login', () => {
    HomePage.productList.should('have.length.greaterThan', 0)
  })

  it('should display add product button for admin user', () => {
    ProductsPage.visit()
    ProductsPage.addProductButton.should('be.visible')
  })
})

describe('Products: Role-based access control', () => {
  let regularUser

  before(() => {
    cy.createUser().then((user) => {
      regularUser = user
    })
  })

  after(() => {
    cy.deleteUser(regularUser._id)
  })

  it('should not display admin options for non-admin user', () => {
    cy.session(
      'regularSession',
      () => {
        cy.loginUI(regularUser.email, regularUser.password)
        cy.url().should('include', '/home')
      },
      { cacheAcrossSpecs: false }
    )
    HomePage.visit()

    cy.url().should('not.include', '/admin')
    ProductsPage.addProductButton.should('not.exist')
  })
})
