class CategoryPage_PO {
    
    getCategoryTitle() {
        return cy.get('h1')
    }

    getItemByIndex(index) {
        return cy.get('.catalog-grid .catalog-grid__cell').eq(index)
    }
}

export default CategoryPage_PO