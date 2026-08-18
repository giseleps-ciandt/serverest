class ProductsPage {
  get addProductButton() {
    return cy.get('[data-testid="cadastrarProdutos"]')
  }

  visit() {
    cy.visit('/admin/home')
    return this
  }
}

module.exports = new ProductsPage()
