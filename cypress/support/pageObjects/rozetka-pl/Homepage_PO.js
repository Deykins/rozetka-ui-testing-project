class HomePage_PO {

    visitHomepage() {
        cy.visit(Cypress.env("rozetka_homepage"), {timeout: 60000})
    }

    acceptCookies() {
        cy.get('.action-buttons .button').eq(0).click()
    }

    declineCookies() {
        cy.get('.action-buttons .button').eq(1).click()
    }

    getCategoryList() {
        return cy.get('.menu-categories__link')
    }

    getLogo() {
        return cy.get('img').eq(1)
    }

    getBasketButton() {
        return cy.get('.header-actions__item--cart')
    }

    getCategory(index) {
        return cy.get('.menu-categories__link').eq(index)
    }

    getAboutUsLink() {
        return cy.get('a[class="ng-tns-c109-3"][href*="/about/"]')
    }

    logIn() {
        cy.get('.header-actions__item--user').click()
    }

    getSearchTextField() {
        return cy.get('input')
    }

}

export default HomePage_PO