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
    return cy.get(".catalog-grid>li", { timeout: 10000 });
  }

  checkProductContainProducerName(name) {
    this.getCatalogGrid().each(($item) => {
      const producer_text = $item.text().toLowerCase();
      expect(producer_text).to.contain(name.toLowerCase());
    });
  }

  getPaginationList() {
    return cy.get(".pagination__list>li");
  }

  getCurrentPage() {
    return cy.xpath("//a[contains(@class, '--active')]");
  }

  getNextPageButton() {
    return cy.xpath("//a[contains(@class, 'forward')]");
  }
}

export default CategoryPage_PO;
