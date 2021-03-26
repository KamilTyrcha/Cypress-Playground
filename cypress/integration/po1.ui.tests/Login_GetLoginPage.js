/// <reference types="cypress" />

context('Get login page', () =>
{
       
    beforeEach(() => 
    { 
        cy.visitAndCheckConsole(Cypress.env('login_url'));
        cy.login(`${Cypress.env('login')}`, `${Cypress.env('password')}`);  
    });

    it('Login_GetLoginPage', () =>
    {  
        cy.url().should('include', '/umbraco#/content');
    });    

   afterEach(() => 
   {
        cy.logout();   
   });
});