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

  it('clicks the Subscribe button and shows a succes message', () => {
     cy.contains('button','Subscribe').click()
     cy.get('#success')
    .should('have.text', "You've been successfully subscribed to our newsletter.")
    .should('be.visible');
  })

  it('type in a input which', () => {
     cy.get('#signature-textarea').type('Cypress is awesome!')
     cy.get('#signature').should('have.text', 'Cypress is awesome!')
  })

  it('type in a second input text and check a uncheck', () =>{
     cy.get('#signature-textarea-with-checkbox').type('Lucas')
     cy.get('#signature-checkbox').check()
     cy.get('#signature-triggered-by-check').should('have.text','Lucas')
     cy.get('#signature-checkbox').uncheck()
     cy.get('#signature-triggered-by-check').should('not.have.text','Lucas')
  })
   
  it.only('check and uncheck radio button', () =>{
    cy.get('#off').check()
    cy.get('#on-off').should('have.text','OFF')
    cy.get('#on').check()
    cy.get('#on-off').should('have.text','ON')



  })



});
