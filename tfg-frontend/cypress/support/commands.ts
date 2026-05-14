/// <reference types="cypress" />

Cypress.Commands.add('loginAdmin' as any, (email, password) => {
  cy.visit('http://localhost:3000/login')
  cy.get('input[name="email"]').type(email as string)
  cy.get('input[name="password"]').type(password as string)
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/login')
  cy.visit('http://localhost:3000/')
})

Cypress.Commands.add('registrarCasoHumano' as any, () => {
  cy.contains('Registrar datos').click()
  cy.visit('http://localhost:3000/registrar/humanos')
  cy.get('#edad').type('35')
  cy.get('#sexo').select('H')
  cy.get('#fechaCaso').type('2024-04-01')
  cy.get('#enfermedad').select('Dengue')
  cy.get('#provinciaResidencia').select('Zaragoza')
  cy.get('#municipioResidencia').type('Zaragoza')
  cy.get('#pais-select').type('España')
  cy.get('#casoHospitalizado').check()
  cy.get('button[type="submit"]').click()
  cy.wait(500)
})

Cypress.Commands.add('registrarCasoMonitoreo' as any, () => {
  cy.contains('Registrar datos').click()
  cy.visit('http://localhost:3000/registrar/monitoreo')
  cy.get('#lugar').type('Parque Delicias de Zaragoza')
  cy.get('#vector').type('Aedes albopictus')
  cy.get('#enfermedad').select('Fiebre amarilla')
  cy.get('#genero').select('Hembra')
  cy.get('#numero').type('2')
  cy.get('#fecha').type('2026-05-13')
  cy.get('button[type="submit"]').click()
  cy.wait(500)
})

Cypress.Commands.add('registrarCasoGarrapatas' as any, () => {
  cy.contains('Registrar datos').click()
  cy.visit('http://localhost:3000/registrar/garrapatas')
  cy.get('#municipio').type('Borja')
  cy.get('#fechaRecogida').type('2026-05-13')
  cy.get('#especie').select('Ixodes ricinus')
  cy.get('#enHumano').check()
  
  cy.get('button[type="submit"]').click()
  cy.wait(500)
})

export {}