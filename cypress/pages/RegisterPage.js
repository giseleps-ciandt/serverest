class RegisterPage {
  get nameInput() {
    return cy.get('[data-testid="nome"]')
  }

  get emailInput() {
    return cy.get('[data-testid="email"]')
  }

  get passwordInput() {
    return cy.get('[data-testid="password"]')
  }

  get adminCheckbox() {
    return cy.get('[data-testid="checkbox"]')
  }

  get submitButton() {
    return cy.get('[data-testid="cadastrar"]')
  }

  get errorAlert() {
    return cy.get('.alert-secondary')
  }

  visit() {
    cy.visit('/cadastrarusuarios')
    return this
  }

  fill({ nome, email, password, administrador }) {
    this.nameInput.clear().type(nome)
    this.emailInput.clear().type(email)
    this.passwordInput.clear().type(password)
    if (administrador === 'true') {
      this.adminCheckbox.check()
    }
    return this
  }

  submit() {
    this.submitButton.click()
    return this
  }

  register(userData) {
    return this.fill(userData).submit()
  }
}

module.exports = new RegisterPage()
