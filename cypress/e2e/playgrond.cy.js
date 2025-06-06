describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html');
  });  

  it('acessando aplicação cypress playground', () => {
     cy.get('#title').should('have.text', '🌲 Cypress Playground 🛝');
  });
});
