describe ("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("fills all the text input fields", () => {
        const firstName = "Mariana";
        const lastName = "Freitas";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("marisftsabreu@gmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("select 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("select 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("marisftsabreu-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("marisftsabreu@gmail.com");
        
        cy.get("#email.invalid").should("not.exist");
    });

    it("fill and reset the form", () => {
        const firstName = "Mariana";
        const lastName = "Freitas";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);        
        cy.get("#email").type("marisftsabreu@gmail.com");
        
        cy.get("#ticket-quantity").select("2");
        
        cy.get("#vip").check();
        
        cy.get("#friend").check();
        
        cy.get("#requests").type("IPA beer");
        
        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );
        
        cy.get("#agree").click();
        
        cy.get("#signature").type(fullName);
        
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled")
        
        cy.get("button[type='reset']").click();
        
        cy.get("@submitButton").should("be.disabled")
    });
    it("fills mandatory fields using support command", () => {
        const costumer = {
            firstName: "Maria",
            lastName: "de Jesus",
            email: "mariadejesus@exemple.com"
        };
        cy.fillMandatoryFields(costumer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled")
    
        cy.get("#agree").uncheck();
    
        cy.get("@submitButton").should("be.disabled")

    })
});

//cy.get => Busca um campo
//cy.type => Preenche com um texto
//cy.select => Seleciona uma String
//cy.check => Dá um check em um "radio button"
//cy.uncheck => Desmarca um check marcado
//cy.should => verificação se "contain" um texto definido
//.only => executa apenas a função selecionada (mocha)

