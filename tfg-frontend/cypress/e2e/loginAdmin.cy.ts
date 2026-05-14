describe('template spec', () => {
  it('loguea con cuenta de administrador', () => {
    cy.loginAdmin('cvaleroc@salud.aragon.es', 'password')

    cy.get('button').should('contain', 'Inicio')
    cy.get('button').should('contain', 'Gestionar Solicitudes')
    cy.get('button').should('contain', 'Usuarios Activos')
    cy.get('button').should('contain', 'Cerrar sesión')
  })
})