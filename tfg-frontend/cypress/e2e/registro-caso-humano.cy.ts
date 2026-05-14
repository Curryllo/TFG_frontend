describe('Flujo de registro de caso humano', () => {

  beforeEach(() => {
    cy.loginAdmin('fvalero@unizar.es', 'password')
  })

  it('debería registrar un caso humano correctamente y mostrar confirmación', () => {
    cy.registrarCasoHumano()
    cy.contains('¡Registro realizado con éxito!').should('be.visible')
  })

})