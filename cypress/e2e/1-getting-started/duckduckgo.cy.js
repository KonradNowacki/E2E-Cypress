/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://duckduckgo.com')

    cy.get('#search_form_input_homepage').as('searchInput')
  })

  it('should navigate correctly', () => {
    cy.url().should('include', 'duckduckgo.com')
  });

  it('should contain search bar', () => {
    cy.get('@searchInput').should('be.visible', true)
  });

  it('should show autocomplete menu', () => {
    cy.get('@searchInput').type('Example text')
    cy.get('.search__autocomplete').should('be.visible', true)
  });

  it('should have at least one autocomplete hint', () => {
      cy.get('@searchInput').type('I love')
      cy.get('.acp-wrap .acp').should('have.length.above', 1)
  });

  it('should show search results when clicked the magnifying glass', () => {
    cy.get('@searchInput').type('I love')
    cy.get('#search_button_homepage').click();
    cy.get('#links_wrapper').should('be.visible')
    cy.get('#links .nrn-react-div').should('have.length.above', 1)
  });

  it('should show search results when clicked ENTER on keyboard', () => {
    cy.get('@searchInput').type('Ford Mustang GT{enter}')
    cy.get('#links_wrapper').should('be.visible')
    cy.get('#links .nrn-react-div').should('have.length.above', 1)
  });

  it('should correctly reset the typing', () => {
    cy.get('@searchInput').type('Best restaurants')
    cy.get('@searchInput').should('have.value', 'Best restaurants')
    cy.get('#search_form_input_clear').click()
    cy.get('@searchInput').should('be.empty')
  });

  it('should correctly change DDG language', () => {
    cy.get('.header__button--menu').click()
    cy.get('.nav-menu--slideout').contains('All Settings').click()
    // TODO KN Add checking if language has changed
  });

})
