describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html');
  });  

   it('shows promotional banner', () => {
     cy.get('#promotional-banner').should('be.visible')
  });

  it('verify title', () => {
     cy.get('#title').should('have.text', '🌲 Cypress Playground 🛝');
  });

  it.only('clicks the Subscribe button and shows a succes message', () => {
     cy.contains('button','Subscribe').click()
   
     cy.contains('#success',
      "'You've been successfully subscribed to our newsletter."
     ).should('be.visible')
    })

});
