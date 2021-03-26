/// <reference types="cypress" />

context('Adding different item types into test conten page', () =>
{
    
    let myTestContentPage = "MyTestContentPage";

    beforeEach(() => 
    { 
        cy.visitAndCheckConsole(Cypress.env('login_url'));
        cy.login(`${Cypress.env('login')}`, `${Cypress.env('password')}`);  
    });

    it('ContentPages_GetItemFAQ_ContentAreReturned', () =>
    {
        cy.get('li.current').
            should('be.visible').click();

        //-------------------------list: Insight Vacations------------------------//

        cy.get('[data-element="tree-item-Insight Vacations"]').
            should('be.visible').
                find('.umb-tree-item__inner').
                should('be.visible').  
                    find('[data-element="tree-item-expand"]').
                    should('be.visible').click();
    
        //-------------------------list: en-us region------------------------//

        cy.get('[data-element="tree-item-en-us"]').
            should('be.visible').
                find('.umb-tree-item__inner').
                should('be.visible').  
                    find('[data-element="tree-item-expand"]').
                    should('be.visible').click();       
        
        //-------------------------item: ContentPage------------------------//

        cy.get('[data-element="tree-item-Content page"]').
            should('be.visible').
                find('.umb-tree-item__inner').
                should('be.visible').  
                    find('.umb-tree-item__label').
                    should('be.visible').
                    should('have.attr', 'href').then((href) => {
                        cy.visitAndCheckConsole(`${Cypress.env('base_url')}/umbraco${href}`)
                  });  

        cy.get('.umb-table-body__link').
            should('be.visible').
                contains(`${myTestContentPage}`).
                should('be.visible').
                should('have.attr', 'href').then((href) => {
                    cy.visitAndCheckConsole(`${Cypress.env('base_url')}/umbraco${href}`)
              });

        cy.get('[ng-click="vm.clicked()"]').
            should('be.visible').
                find('.umb-sub-views-nav-item-text').
                should('be.visible').
                    contains('Info').
                    should('be.visible').
                        click();

        //-------------------------Links------------------------// 

        cy.get('[ng-if="currentUrls"]').within(() => {
            cy.get('.umb-box-header').
                should('be.visible').
                contains('Links');

        cy.get('a').
            should('be.visible').
            should('have.attr', 'href').then((href) => {
                cy.visitAndCheckConsole(`${Cypress.env('base_url')}${href}`);  
              })
            })                           
            
        cy.url().should('include', `/content-page/${myTestContentPage.toLowerCase()}`);

        //-------------------------Target FAQ item------------------------//       

        cy.get('[data-testid="page-block-faq"]').
            should('be.visible').
                find('.faq.with-padding').
                should('be.visible').within(() => 
                {
                    cy.get('.faq__anchor').
                        should('be.visible');

                    cy.get('.faq__wrapper').
                        should('be.visible').   
                            find('.faq_content').
                            should('be.visible').
                                find('.faq__header').
                                should('be.visible');
                });
                
        cy.get('[placeholder="Search it"]').type("Let's search somethind !");
        cy.go('back');
    });  

   afterEach(() => 
   {
        cy.logout();   
   });
});