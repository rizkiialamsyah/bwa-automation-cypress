describe("Dashboard page test cases", () => {
  it("Do login with correct values", () => {
    cy.visit("http://localhost:3000");
    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains("welcome");
    });

    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("found no post for the first time", () => {
    cy.contains("Found 0 photos");
  });

  it("contains image url, and description input, and publish button", () => {
    // check image
    const image = cy.get("input[name='image']");
    image.should("be.visible");
    image.should("have.attr", "type", "url");
    image.should("have.attr", "required", "required");
    image.should("have.attr", "placeholder", "Image URL");

    // check description
    const description = cy.get("input[name='desc']");
    description.should("be.visible");
    description.should("have.attr", "type", "text");
    description.should("have.attr", "required", "required");
    description.should("have.attr", "placeholder", "What's on your mind?");

    // check description
    const button = cy.get("button");
    button.should("be.visible");
    button.contains("Publish!");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Upload some photos", () => {
    const photos = [
      {
        imageValue:
          "https://images.unsplash.com/photo-1695239510467-f1e93d649c2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80",
        descriptionValue: "image 1: lorem ipsum",
      },
      {
        imageValue:
          "https://images.unsplash.com/photo-1694813646560-b7afa704f3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
        descriptionValue: "image 2: lorem ipsum",
      },
    ];
    photos.forEach(({ imageValue, descriptionValue }) => {
      const image = cy.get("input[name='image']");
      image.type(imageValue);

      const description = cy.get("input[name='desc']");
      description.type(descriptionValue);

      const button = cy.get("button");
      button.click();

      cy.get("img").should("have.attr", "src", imageValue);
      cy.contains(descriptionValue);
    });

    cy.contains(`Found ${photos.length} photo`);
  });
});
