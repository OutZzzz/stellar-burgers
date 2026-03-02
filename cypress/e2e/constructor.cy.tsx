
describe("Тесты для страницы конструктора бургера", () => {
    beforeEach(() => {
        cy.intercept("GET", "**/api/ingredients", { fixture: "ingredients.json" }).as("getIngredientsApi");
        cy.visit("http://localhost:4000");
        cy.wait("@getIngredientsApi");
    })
    it('Добавление ингредиентов в конструктор', () => {
         /* Проверка что конструктор пустой */
        cy.get('[data-testid="order"]').contains("Выберите булки").should("exist");
        cy.get('[data-testid="order"]').contains("Выберите начинку").should("exist");

        /* Добавление ингредиентов */
        cy.get('[data-testid="ingredient-1"]').contains("button", "Добавить").click();
        cy.get('[data-testid="ingredient-2"]').contains("button", "Добавить").click();
        cy.get('[data-testid="ingredient-3"]').contains("button", "Добавить").click();

        /* Проверка что конструктор не пустой */
        cy.get('[data-testid="order"]').contains("Лунная булка L-3000i (верх)").should("exist");
        cy.get('[data-testid="order"]').contains("Лунная булка L-3000i (низ)").should("exist");
        cy.get('[data-testid="order"]').contains("Котлета из нургла").should("exist");
        cy.get('[data-testid="order"]').contains("Котлета и биомусора").should("exist");
    })
    it('Тестирование работы модального окна', () => {
        /* Проверка открытия модального окна и закрытия нажатием на закрытие */
        cy.get('[data-testid="ingredient-1"]').click();
        cy.get('[data-testid="modal"]').should('exist')
        cy.get('[data-testid="modal"]').find('button[type="button"]').click();
        cy.get('[data-testid="modal"]').should('not.exist')

         /* Проверка открытия модального окна и закрытия нажатием вне области окна */
        cy.get('[data-testid="ingredient-1"]').click();
        cy.get('[data-testid="modal"]').should('exist')
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.get('[data-testid="modal"]').should('not.exist')
    })
    it('Тестирование создания заказа', () => {
        /* Авторизация */
        cy.setCookie('accessToken', 'Bearer mock-tocken');
        cy.intercept("GET", "**/auth/user", { fixture: "user.json" }).as("getUser");
        cy.wait("@getUser");

        /* Добавление ингредиентов */
        cy.get('[data-testid="ingredient-1"]').contains("button", "Добавить").click();
        cy.get('[data-testid="ingredient-2"]').contains("button", "Добавить").click();
        cy.get('[data-testid="ingredient-3"]').contains("button", "Добавить").click();

        /* Перехват запроса */
        cy.intercept("POST", "**/orders", { fixture: "order.json" }).as("sendOrder");
        cy.get('[data-testid="order"]').find('button[type="button"]').click();
        cy.get('[data-testid="modal"]').should('exist');
        cy.wait('@sendOrder');

        /* Проверка модального окна */
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal"]').contains("65535").should("exist");
        cy.get('[data-testid="modal"]').find('button[type="button"]').click();
        cy.get('[data-testid="modal"]').should('not.exist')

        cy.intercept("GET", "**/orders/all", { fixture: "feed.json" }).as("getFeed");
        cy.wait("@getFeed");
    })
})