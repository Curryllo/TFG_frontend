describe('template spec', () => {
  it('loguea con cuenta de usuario', () => {
    cy.loginAdmin('fvalero@unizar.es', 'password')

    cy.get('button').should('contain', 'Inicio')
    cy.get('button').should('contain', 'Cerrar sesión')
  })
})