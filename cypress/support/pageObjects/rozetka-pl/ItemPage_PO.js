class ItemPage_PO {
    
   getBuyButton() {
      return cy.get('.buy-button').contains('Do koszyka')
   }

}

export default ItemPage_PO