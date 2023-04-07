class LogInWindow_PO {

    clickOnSubmitButton() {
        cy.get('.auth-modal__submit').click()
    }
    
    getErrortMessage() {
        return cy.get('.error-message')
    }
 
 }
 
 export default LogInWindow_PO