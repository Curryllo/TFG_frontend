describe('Flujo de registro de monitoreo entomológico', () => {

  beforeEach(() => {
    cy.loginAdmin('fvalero@unizar.es', 'password')
  })

  it('debería registrar un caso de monitreo entomológico correctamente y mostrar confirmación', () => {
    cy.registrarCasoMonitoreo()
    cy.contains('¡Registro realizado con éxito!').should('be.visible')
  })

})