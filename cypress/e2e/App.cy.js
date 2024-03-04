/* globals cy */
    
describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with Login', () => {
    cy.visit ('/');
    cy.get('[data-cy=signin]').should('contain', 'Sign In');
  });

});