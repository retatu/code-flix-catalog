import { Category } from "./category"

describe("Category :: Unit Test", () => {
  test("Constructor", () => {
    const date = new Date();
    const props = { name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date };
    const category = new Category({ name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date });
    expect(category.name).toBe("valid_name");
    expect(category.isActive).toBeTruthy();
    expect(category.description).toBe("valid_description");
    expect(category.createdAt).toBe(date);
    expect(category.props).toMatchObject(props);
    expect(category.props).toStrictEqual(props);
  })
})