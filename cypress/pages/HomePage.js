class HomePage {
  get productList() {
    return cy.get('.card-title.negrito')
  }

  get logoutButton() {
    return cy.get('[data-testid="logout"]')
  }

  visit() {
    cy.visit('/home')
    return this
  }

  logout() {
    this.logoutButton.click()
    return this
  }
}

module.exports = new HomePage()
