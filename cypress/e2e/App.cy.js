/* globals cy */
    
describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with Login', () => {
    cy.visit ('/');
    cy.get('[data-cy=signin]').should('contain', 'Sign In');
  });

  it('shows camera when first button clicked', () => {
    cy.visit ('/');
    cy.get('[data-cy=signin]').click();
    cy.get('[data-cy=button1]').click();
    cy.get('[data-cy=capture]').should('contain' ,'Capture Photo');
  });

  it('shows camera when first button clicked', () => {
    cy.visit ('/ScannerDefault');
    cy.get('[data-cy=capture]').should('contain' ,'Capture Photo');
  });
});