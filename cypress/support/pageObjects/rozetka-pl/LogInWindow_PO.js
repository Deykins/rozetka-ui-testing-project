class LogInWindow_PO {

    getSubmitButton() {
        return cy.get('.auth-modal__submit')
    }
    
    getErrortMessage() {
        return cy.get('.error-message')
    }

    getEmailField() {
        return cy.get('#auth_email')
    }

    getPasswordField() {
        return cy.get('#auth_pass')
    }
    
    getRememberMeCheckbox() {
        return cy.get('#remember_me')
    }
 }
 
 export default LogInWindow_PO