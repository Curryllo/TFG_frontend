describe('Carga de visualizaciones', () => {

  beforeEach(() => {
    cy.loginAdmin('fvalero@unizar.es', 'password')
  })

  it('debería cargar la página de gráficos con contenido', () => {
    cy.visit('/visualizar/graficos')
    cy.contains('Análisis de Casos Humanos').should('be.visible')
    cy.contains('Análisis de Monitoreo Entomológico').should('be.visible')
    cy.contains('Análisis de Garrapatas').should('be.visible')
  })

  it('debería renderizar el mapa con marcadores', () => {
  cy.visit('/visualizar/mapas', { failOnStatusCode: false })
  cy.get('.leaflet-container').should('exist')
  cy.contains('Mapas Disponibles').should('be.visible')
  cy.contains('Casos Humanos').should('be.visible')
  cy.contains('Monitoreo Entomológico').should('be.visible')
  cy.contains('Garrapatas').should('be.visible')
  cy.contains('Calor').should('be.visible')
})

})