declare namespace Cypress {
  interface Chainable {
    loginAdmin(email: string, password: string): Chainable<void>
    registrarCasoHumano(): Chainable<void>
    registrarCasoMonitoreo(): Chainable<void>
    registrarCasoGarrapatas(): Chainable<void>
  }
}