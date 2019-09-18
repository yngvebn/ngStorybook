/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/iframe.html?id=myfancycomponent--components-normal')
  })

  it('click the button', () => {
    // https://on.cypress.io/type
    cy.get('button').click();
  });

  it('click the button again', () => {
    // https://on.cypress.io/type
    cy.get('button').click();
  });
});
