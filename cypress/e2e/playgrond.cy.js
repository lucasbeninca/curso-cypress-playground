describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
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
  
  it('check and uncheck radio button', () =>{
    cy.get('#off').check()
    cy.get('#on-off').should('have.text','OFF')
    cy.get('#on').check()
    cy.get('#on-off').should('have.text','ON')
  })

  it('selecting suspended dropdown elements', () => {
    cy.get('#select-selection').should('be.visible')
    cy.get('#select-selection').should('have.text',"You haven't selected a type yet.")
    cy.get('#selection-type').select('Standard')
    cy.get('#select-selection').should('have.text',"You've selected: STANDARD")

  })

  it('selecting multiple selections in a select field', () => {
     cy.contains('p', "You haven't selected any fruit yet.").should('be.visible')
     cy.get('#fruit').select(['apple', 'elderberry', 'banana'])
     cy.get('#fruits-paragraph').should('have.text', "You've selected the following fruits: apple, banana, elderberry")
  })

  it('select file an upload it', () => {
    cy.get('#file-upload').should('be.visible')
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json')
    cy.get('#file').should('have.text', 'The following file has been selected for upload: example.json')
  });

  it('intersepting an http request and creating aliases', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1')
      .as('getTodo')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo') // aguardo receber a resposta da requisição
      .its('response.statusCode')
      .should('eq', 200)
    cy.contains('li','TODO ID: 1').should('be.visible')
    cy.contains('li','Title: delectus aut autem').should('be.visible')
    cy.contains('li','Completed: false').should('be.visible')
    cy.contains('li','User ID: 1').should('be.visible')
  })
  
  it('overwriting the result of a network request', () => {
    const todo = require('../fixtures/todo')

    cy.intercept(
      'GET', 
      'https://jsonplaceholder.typicode.com/todos/1',
       { fixture: 'todo' }
    ).as('getTodo')
    
    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo')
      .its('response.statusCode')
      .should('eq', 200)

    cy.contains('li',`TODO ID: ${todo.id}`).should('be.visible')
    cy.contains('li',`Title: ${todo.title}`).should('be.visible')
    cy.contains('li',`Completed: ${todo.completed}`).should('be.visible')
    cy.contains('li',`User ID: ${todo.userId}`).should('be.visible')

  })

  it('Simulating an error in the API', () => {
    cy.intercept(
      'GET', 
      'https://jsonplaceholder.typicode.com/todos/1', 
      {statusCode: 500}
    ).as('serverFailure')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@serverFailure')
      .its('response.statusCode')
      .should('eq', 500)

    cy.get('.error').should('be.visible')
      .and('contain.text', 'Oops, something went wrong. Refresh the page and try again.')
  })

  it('simulating an erro in the network', () => {
    cy.intercept(
      'GET', 
      'https://jsonplaceholder.typicode.com/todos/1', 
      {forceNetworkError: true}
    ).as('networkFailure')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@networkFailure')
    cy.contains(
      'spam,',
      'Oops, something went wrong. Check your internet connection, refresh the page, and try again.'
    ).should('be.visible')
  })

  it('creating a simple api test',() => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1')
      .its('status')
      .should('be.equal', 200)
  })

  Cypress._.times(10, index => {
   it.only(`select range inputs ${index + 1} out of 10`, () => {
    cy.get('#level')
      .invoke('val', index + 1)
      .trigger('change')
    cy.contains('#level-paragraph', `You're on level: ${index + 1}`).should('be.visible')


  })
  
  })




})