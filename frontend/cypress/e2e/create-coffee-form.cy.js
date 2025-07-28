describe("Create Coffee Form", () => {
  beforeEach(() => {
    cy.visit("/home");
    cy.contains("Create").click();
  });

  it("should render create coffee form", () => {
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="price"]').should("exist");
    cy.get('input[name="image_url"]').should("exist");
    cy.get('input[name="description"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show error for empty fields", () => {
    cy.get('input[name="name"]').clear();
    cy.get('input[name="price"]').clear();
    cy.get('input[name="image_url"]').clear();
    cy.get('input[name="description"]').type("A test coffee");
    cy.contains("Price must be at least 0.01").should("exist");
    cy.contains("Field is required").should("exist");
  });

  it("should allow typing and submitting", () => {
    cy.get('input[name="name"]').type("Test Coffee");
    cy.get('input[name="price"]').type("4.99");
    cy.get('input[name="image_url"]').type("https://example.com/image.png");
    cy.get('input[name="description"]').type("A test coffee");
    cy.get('button[type="submit"]').click();
  });
});
