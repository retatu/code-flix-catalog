import { Category } from "./category"

describe("Category :: Test", () => {
    test("Constructor of category", () => {
        const category = new Category('valid');
        expect(category.name).toBe("valid");
    })
})