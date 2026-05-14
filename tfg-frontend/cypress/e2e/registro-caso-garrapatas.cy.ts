describe('Flujo de registro de garrapatas', () => {

  beforeEach(() => {
    cy.loginAdmin('fvalero@unizar.es', 'password')
  })

  it('debería registrar un caso de monitreo entomológico correctamente y mostrar confirmación', () => {
    cy.registrarCasoGarrapatas()
    cy.contains('¡Registro realizado con éxito!').should('be.visible')
  })

})