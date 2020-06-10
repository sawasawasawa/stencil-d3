import "cypress-shadow-dom";

describe("dashboard", function () {
  it.only("displays prompt to select element by default", function () {
    cy.visit("http://localhost:3333");
    cy.shadowContains("Click on a country row to see chart");
  });
  it("displays a chart after clicking on table row", function () {
    cy.visit("http://localhost:3333");

    cy.contains("Afghanistan").click();
  });
});
