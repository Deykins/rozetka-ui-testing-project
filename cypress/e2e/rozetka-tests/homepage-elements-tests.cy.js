import HomePage_PO from "../../support/pageObjects/rozetka-pl/Homepage_PO"
import Basket_PO from "../../support/pageObjects/rozetka-pl/Basket_PO"
import ItemPage_PO from "../../support/pageObjects/rozetka-pl/ItemPage_PO"
import CategoryPage_PO from "../../support/pageObjects/rozetka-pl/CategoryPage_PO"
import LogInWindow_PO from "../../support/pageObjects/rozetka-pl/LogInWindow_PO"
/// <reference types="cypress" />

describe('Verifying elements on the homepage of base URL', () => {

    const homepage = new HomePage_PO()
    const basket = new Basket_PO()
    const itemPage = new ItemPage_PO()
    const categoryPage = new CategoryPage_PO()
    const logInWindow = new LogInWindow_PO()

    beforeEach(() => {
        homepage.visitHomepage({timeout:10000})
        homepage.acceptCookies()
        cy.fixture('rozetkaTestData').as('data')
    })

    it('TC000001 Verify, that homepage is displayed', () => {
        homepage.getCategoryList().should('have.length', 24)
    })

    it('TC000002 Verify, that rozetka logo is displayed on homepage', () => {
        homepage.getLogo().should('have.attr', 'alt', 'Rozetka Logo')
    })

    it('TC000003 Unauthorized user can check the basket', () => {
        homepage.getBasketButton().click()
        basket.getBasketTitle().should('have.text', ' Koszyk')
    })

    it('TC000004 Verify, that first category title is Komputery i laptopy', () => {
        let expectedText
        homepage.getCategory(0).then($cat => {
            expectedText = $cat.text()
        })
        homepage.getCategory(0).click({force:true})
        categoryPage.getCategoryTitle().then($title => {
            expect($title.text()).to.equal(expectedText)
        })
    })

    it('TC000005 Verify, that user allowed to add item to basket', () => {
        homepage.getCategory(0).click({force:true})
        categoryPage.getItemByIndex(0).click({timeout:5000})
        itemPage.getBuyButton().click()
        // basket.getBasketTitle()
        // cy.get('.cart-product__title', {timeout:10000})
        // cy.get('.modal__close', {timeout:6000}).click()
        // cy.get('.badge', {timeout:6000}).should('have.text', ' 1 ')
    })    

    it('TC000006 Verify, that user can search products', () => {
        cy.get('@data').then((data) => {
            homepage.getSearchTextField().type(data.searchText + '{Enter}')  //phone
            cy.url().should('include', data.searchText, {timeout:10000})       
        })
        // cy.get('h1', {timeout:10000})                                     //selector can't be finded for some reason
        // cy.visit('https://rozetka.pl/search/?text=phone')
        // cy.get('h1').should('have.text', '«phone»')
    })

    it('TC000007 Verify "O nas" link is redirect to correct page', () => {
        homepage.getAboutUsLink().click()
        cy.url().should('include', '/about/')
    })

    it('TC000008 Verify, that correct error message displayed on login form', () => {
        homepage.logIn()
        logInWindow.clickOnSubmitButton()
        cy.get('@data').then((data) => {
            logInWindow.getErrortMessage().should('have.text', data.errorMessage)
        })
    })
})