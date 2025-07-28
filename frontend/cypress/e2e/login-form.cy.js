describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should render login form", () => {
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.contains("Sign In").should("exist");
  });

  it("should show error for empty fields", () => {
    cy.get('input[name="name"]').type("a");
    cy.get('input[name="password"]').type("123");

    cy.contains("Name must be at least 3 characters").should("exist");
    cy.contains("Password must be at least 6 characters").should("exist");
  });

  it("should allow click", () => {
    cy.get('input[name="name"]').type("validname");
    cy.get('input[name="password"]').type("123123");
    cy.contains("Sign In").click();
  });

  it("password needs to be equals", () => {
    cy.contains("Don't have an account? Sign Up").click();

    cy.get('input[name="name"]').type("validname");
    cy.get('input[name="password"]').type("123123");
    cy.get('input[name="confirmPassword"]').type("123123");
  });

  it("should show an error message for password mismatch", () => {
    cy.contains("Don't have an account? Sign Up").click();

    cy.get('input[name="name"]').type("validname");
    cy.get('input[name="password"]').type("123123");
    cy.get('input[name="confirmPassword"]').type("12312");
    cy.contains("Passwords must match").should("exist");
  });
});
