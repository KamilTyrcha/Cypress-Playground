Cypress.Commands.add('login', (email, password) =>
{
cy.get('#umb-username').type(email)
cy.get('#umb-passwordTwo').type(password)
cy.get('.btn.umb-button__button.btn-success.umb-button--m.umb-outline').contains('Login').click();
cy.url().should('include', '/umbraco#/content');
});

Cypress.Commands.add('logout', () =>
{
  cy.get('[ng-click="avatarClick()"]').click();
  cy.contains('Logout').click()
  cy.url().should('include', '/umbraco#/login/false');
});

Cypress.Commands.add('visitAndCheckConsole', (url) =>
{
  cy.visit(url);
  cy.get('@beforeWindowLoadConsoleErrors').
    its('callCount').
      should('eq', 0, `After visiting the page: ${url} were occurred errors in console:`);
});

Cypress.Commands.add('getSessionStorage', (key) => {
    cy.window().then((window) => window.sessionStorage.getItem(key))
  });
  
  Cypress.Commands.add('setSessionStorage', (key, value) => {
    cy.window().then((window) => {
      window.sessionStorage.setItem(key, value)
    })
  });

  function getRandom(number) {
    const result = Math.floor(Math.random() * number);
    return result;
  };
  
Cypress.Commands.add('getRandom', getRandom);
