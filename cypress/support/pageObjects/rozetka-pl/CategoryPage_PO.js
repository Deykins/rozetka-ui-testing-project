class CategoryPage_PO {
  getCategoryTitle() {
    return cy.get("h1", { timeout: 10000 });
  }

  getItemByIndex(index) {
    return cy.get(".catalog-grid .catalog-grid__cell").eq(index);
  }

  getProducerSearchLine() {
    return cy.xpath(
      "//*[@data-filter-name='producer']//input[@name='searchline']"
    );
  }

  getCatalogGrid() {
    return cy.get(".catalog-grid>li", { timeout: 5000 });
  }

  getSortingOptions() {
    return cy.xpath("//*[contains(@class, 'sorting')]/select")
  }

  getProductPriceList() {
    return cy.xpath("//span[contains(@class, 'price-value')]")
  }
}

export default CategoryPage_PO;
