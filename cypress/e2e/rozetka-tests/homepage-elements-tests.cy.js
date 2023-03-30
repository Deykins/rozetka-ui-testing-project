/// <reference types="cypress" />

describe('Verifying elements on the homepage of base URL', () => {
    it('TC000001 Verify, that homepage is displayed', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.get('.menu-categories__link').should('have.length', 24)
    })

    it('TC000002 Verify, that rozetka logo is displayed on homepage', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.get('img').eq(1).should('have.attr', 'alt', 'Rozetka Logo')
    })

    it('TC000003 Unauthorized user can check the basket', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.get('.header-actions__item--cart').click()
        cy.get('.modal__heading').should('have.text', ' Koszyk')
    })

    it('TC000004 Verify, that first category title is Komputery i laptopy', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.wait(1000)
        cy.get('.menu-wrapper_state_static > ul > li').first().click()
        cy.get('h1[class="catalog-heading ng-star-inserted"]').should('have.text', 'Komputery i laptopy')
    })

    it('TC000005 Verify, that user allowed to add item to basket from homepage', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.wait(1000)
        cy.get('.menu-wrapper_state_static > ul > li').first().click()
        cy.get('.catalog-grid > li').first().click()
        cy.get('.buy-button').contains('Do koszyka').click()
        cy.get('.modal__close').click()
        cy.get('.header-actions__item--cart').should('have.text', ' 1 ')
    })    

    it.only('TC000006 Verify, that user can search products', () => {
        cy.visit('https://rozetka.pl') 
        cy.get('.action-buttons .button').eq(0).click()
        cy.get('input').type('phone{Enter}')
        cy.get('body')
        cy.get('h1')
        

    })
})