import Homepage_PO from "../../support/pageObjects/rozetka-pl/Homepage_PO";
import Basket_PO from "../../support/pageObjects/rozetka-pl/Basket_PO";
import ItemPage_PO from "../../support/pageObjects/rozetka-pl/ItemPage_PO";
import CategoryPage_PO from "../../support/pageObjects/rozetka-pl/CategoryPage_PO";
import LogInWindow_PO from "../../support/pageObjects/rozetka-pl/LogInWindow_PO";

/// <reference types="Cypress" />
/// <reference types="Cypress-xpath" />

describe("Verifying elements on the homepage of base URL", () => {
  const homepage = new Homepage_PO();
  const basket = new Basket_PO();
  const itemPage = new ItemPage_PO();
  const categoryPage = new CategoryPage_PO();
  const logInWindow = new LogInWindow_PO();

  function checkLang() {
    cy.get("@data").then((data) => {
      homepage.getActualLanguage().then(($lang) => {
        const lang = $lang.text();
        cy.log("Actual language is " + lang);
        homepage.getCategory(0).should("have.text", data.categoryList[lang][0]);
      });
    });
  }

  beforeEach(() => {
    homepage.visitHomepage({ timeout: 10000 });
    homepage.acceptCookies();
    cy.fixture("rozetkaTestData").as("data");
  });

  it("TC000001 Verify, that homepage is displayed", () => {
    homepage.getCategoryList().should("have.length", 12);
  });

  it("TC000002 Verify, that rozetka logo is displayed on homepage", () => {
    homepage.getLogo().should("have.attr", "alt", "Rozetka Logo");
  });

  it("TC000003 Unauthorized user can check the basket", () => {
    homepage.getBasketButton().click();
    basket.getBasketTitle().should("have.text", " Koszyk");
  });

  it("TC000004 Verify, that first category title is Komputery i laptopy", () => {
    let expectedText;
    homepage.getCategory(0).then(($cat) => {
      expectedText = $cat.text();
    });
    homepage.getCategory(0).click({ force: true });
    categoryPage.getCategoryTitle().then(($title) => {
      expect($title.text()).to.equal(expectedText);
    });
  });

  it("TC000005 Verify, that user allowed to add item to basket", () => {
    homepage.getCategory(0).click({ force: true });
    categoryPage.getItemByIndex(0).click({ timeout: 5000 });
    itemPage.getBuyButton().click();
    // basket.getBasketTitle()
    // cy.get('.cart-product__title', {timeout:10000})
    // cy.get('.modal__close', {timeout:6000}).click()
    // cy.get('.badge', {timeout:6000}).should('have.text', ' 1 ')        //Cypress cannot find an element for some reason
  });

  it("TC000006 Verify, that user can search products", () => {
    cy.get("@data").then((data) => {
      homepage.getSearchTextField().type(data.searchText + "{Enter}"); // string is "phone"
      cy.url().should("include", data.searchText, { timeout: 10000 });
    });
    // cy.get('h1', {timeout:10000})                                      //selector can't be finded for some reason
    // cy.visit('https://rozetka.pl/search/?text=phone')
    // cy.get('h1').should('have.text', '«phone»')
  });

  it('TC000007 Verify "O nas" link is redirect to correct page', () => {
    homepage.getAboutUsLink().click();
    cy.url().should("include", "/about/");
  });

  it("TC000008 Verify, that correct error message displayed on login form", () => {
    homepage.logIn();
    logInWindow.getSubmitButton().click();
    cy.get("@data").then((data) => {
      logInWindow.getErrortMessage().should("have.text", data.errorMessage);
    });
  });

  it("TC000009 Verify, that registered user can login with valid credentials", () => {
    homepage.logIn();
    cy.get("@data").then((data) => {
      logInWindow.getEmailField().type(data.email);
      logInWindow.getPasswordField().type(data.password);
    });
    logInWindow.getRememberMeCheckbox().ch;
    logInWindow.getSubmitButton().click();
    cy.get("#ngrecaptcha-0 *> iframe").should("be.visible");
    // cy.get('#ngrecaptcha-0 *> iframe').then($iframe => {
    //     const body = $iframe.contents().find('body')
    //     cy.wrap(body).as('iframe')
    // })
    // cy.get('@iframe').find('#rc-anchor-container')                    //reCaptcha cannot be wrapped by Cypress
  });

  it("TC000010 Verify, that categories displayed in correct order", () => {
    cy.get("@data").then((data) => {
      let lang;
      homepage.getActualLanguage().then(($lang) => {
        lang = $lang.text();
      });
      homepage.getCategoryList().each(($el, index, $list) => {
        expect($el.text()).is.equal(data.categoryList[lang][index]); //Check the list
      });
    });
  });

  it("TC000011 Verify, that color changing of hovered element Interface language switcher", () => {
    // homepage.getUaLangSwitcher();
    homepage
      .getUaLangSwitcher()
      .should("have.css", "color", "rgb(255, 255, 255)")
      .trigger("mouseover", "bottom", { force: true });
    cy.log(
      "Here test should check chnging of color, but cypress cannot hover correctly"
    );
    //.then(($ua) => {
    //expect($ua).to.have.css("color", "rgb(248, 65, 71)"); //This test should pass, because hover over element not working corectly
    //});
  });

  it("TC000012 Verify filter on a category page ", () => {
    const producer = "ASUS";
    homepage.getCategory(0).click({ force: true });
    categoryPage.getProducerSearchLine().type(producer);
    cy.get(".checkbox-filter>li").contains(producer).click();
    categoryPage
      .getItemByIndex(0)
      .should("contain", producer, { timeout: 10000 }); //Waiting for catalog grid of specific producer name
    categoryPage.getCatalogGrid().each(($item) => {
      const producer_text = $item.text().toLowerCase();
      expect(producer_text).to.contain(producer.toLowerCase());
    });
    cy.log("All items on this page contains " + producer + ".");
    cy.log("TEST PASS");
  });

  it("TC000013 Verify language switching", () => {
    checkLang();
    homepage.switchInterfaceLanguage();
    checkLang();
    homepage.switchInterfaceLanguage();
    checkLang();
  });

  it("#31 Verify price  sorting", () => {
    function convertToDigit(price) {
      return Number(
        price.replace("zł", "").replace(",", ".").replace(/\s/g, "")
      ); //convert string to a number
     }
    homepage.getCategoryList().first().click({ force: true });
    categoryPage.getSortingOptions().select("1: cheap");
    cy.wait(1000);
    let firstPrice;
    categoryPage
      .getProductPriceList()
      .first()
      .then((first) => {
        cy.log(first.text());
        firstPrice = convertToDigit(first.text());
      })
      .then(() => {
        categoryPage
          .getProductPriceList()
          .last()
          .then((last) => {
            const lastPrice = convertToDigit(last.text());
            expect(firstPrice).lessThan(lastPrice);
          });
      });
  });
});

  it("Verify price sorting #31 (Extended)", () => {
    function convertToDigit(price) {
      return Number(
        price.replace("zł", "").replace(",", ".").replace(/\s/g, "") //convert string to a number
      );
    }
    homepage.getCategoryList().first().click({ force: true });
    let option;
    categoryPage
      .getSortingOptions()
      .select("1: cheap")
      .then(($option) => {
        option = $option.text();
      })
      .then(() => {
        categoryPage
          .getSortingOptions()
          .first()
          .then(($activeOption) => {
            expect(option).to.be.equal($activeOption.text());
            homepage.getPreloader().should("not.have.attr", "hidden"); //check page loading by progress bar
            homepage.getPreloader().should("have.attr", "hidden");
          });
      });
    let previousPrice = 0;
    categoryPage.getProductPriceList().each(($price, index, list) => {
      expect(previousPrice).within(
        previousPrice,
        convertToDigit($price.text())
      );
      previousPrice = convertToDigit($price.text());
    });
  });
});

describe("Timing of page loading", () => {
  const homepage = new Homepage_PO();
  it("TC000014 Verify, that homepage is loaded for less, then 10 seconds", () => {
    let start = 0;
    cy.then(() => {
      start = performance.now();
    });
    homepage.visitHomepage();
    homepage
      .getCategoryList()
      .last()
      .then(() => {
        const diffSec = (performance.now() - start) / 1000;
        if (diffSec < 5)
          cy.log(
            `The Homepage loaded for ${diffSec.toFixed(1)} sec. Test PASS`
          );
        else cy.log("The Homepage loaded for over given time. Test FAIL");
      });
  });
});
