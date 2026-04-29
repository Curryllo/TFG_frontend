/// <reference types="cypress" />

Cypress.Commands.add('login' as any, (email, password) => {
  cy.visit('/login')
  cy.get('input[type="email"]').type(email as string)
  cy.get('input[type="password"]').type(password as string)
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/login')
})

Cypress.Commands.add('registrarCasoHumano' as any, () => {
  cy.visit('/registrar/humanos')
  cy.get('#edad').type('35')
  cy.get('#sexo').select('H')
  cy.get('#fechaCaso').type('2024-04-01')
  cy.get('#enfermedad').select('Dengue')
  cy.get('#provinciaResidencia').select('Z')
  cy.get('#municipioResidencia').type('Zaragoza')
  cy.get('#pais-select').type('España')
  cy.get('[class*="-menu"]').contains('España').click()
})

export {}