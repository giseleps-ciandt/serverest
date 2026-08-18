class LoginPage {
  get emailInput() {
    return cy.get('[data-testid="email"]')
  }

  get passwordInput() {
    return cy.get('[data-testid="senha"]')
  }

  get submitButton() {
    return cy.get('[data-testid="entrar"]')
  }

  get registerLink() {
    return cy.get('[data-testid="cadastrar"]')
  }

  get errorAlert() {
    return cy.get('.alert-secondary')
  }

  visit() {
    cy.visit('/login')
    return this
  }

  fillEmail(email) {
    this.emailInput.clear().type(email)
    return this
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password)
    return this
  }

  submit() {
    this.submitButton.click()
    return this
  }

  login(email, password) {
    return this.fillEmail(email).fillPassword(password).submit()
  }

  goToRegister() {
    this.registerLink.click()
    return this
  }
}

module.exports = new LoginPage()
