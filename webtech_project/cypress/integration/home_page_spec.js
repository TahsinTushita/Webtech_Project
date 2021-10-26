describe("The user element", () => {
  it("works successfully", () => {
    cy.visit("/");
    cy.get("input.user_username").type("tushita");
    cy.get("button.submitBtnUser")
      .click()
      .then(() => {
        cy.contains("tushita").then(() => {
          cy.get("button.deleteBtnUser")
            .last()
            .click({ force: true });
        });
      });
  });
});

describe("The pet element", () => {
  it("works successfully", () => {
    cy.get("input.petName").type("Akamaru");
    cy.get("input.pet_username").type("Kiba");
    cy.get("button.submitBtnPet")
      .click()
      .then(() => {
        cy.contains("Akamaru").then(() => {
          cy.get("button.deleteBtnPet")
            .last()
            .click({ force: true });
        });
      });
  });
});

describe("The hobby element", () => {
  it("works successfully", () => {
    cy.get("input.hobbyName").type("Reading");
    cy.get("input.hobby_username").type("itachi");
    cy.get("button.submitBtnHobby")
      .click()
      .then(() => {
        cy.contains("Reading").then(() => {
          cy.get("button.deleteBtnHobby")
            .last()
            .click({ force: true });
        });
      });
  });
});

describe("The todo element", () => {
  it("works successfully", () => {
    cy.get("input.todo").type("Sleep");
    cy.get("input.todo_username").type("Gara");
    cy.get("button.submitBtnTodo")
      .click()
      .then(() => {
        cy.contains("Sleep").then(() => {
          cy.get("button.deleteBtnTodo")
            .last()
            .click();
        });
      });
  });
});

describe("The blog element", () => {
  it("works successfully", () => {
    cy.get("input.blog").type("Memories of nobody");
    cy.get("input.blog_username").type("Toshiro");
    cy.get("button.submitBtnBlog")
      .click()
      .then(() => {
        cy.contains("Memories of nobody").then(() => {
          cy.get("button.deleteBtnBlog")
            .last()
            .click();
        });
      });
  });
});
