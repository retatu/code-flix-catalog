import { omit } from "lodash";
import { Category, CategoryProperties } from "./category"
import UniqueEntityId from "../../../shared/domain/unique-entity-id.vo";

describe("Category :: Unit Test", () => {
  describe("Constructor", () => {
    test("With all properties", () => {
      const date = new Date();
      const props = { name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date };
      const category = new Category({ name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date } );
      expect(category.name).toBe("valid_name");
      expect(category.isActive).toBeTruthy();
      expect(category.description).toBe("valid_description");
      expect(category.createdAt).toBe(date);
      expect(category.uniqueEntityId).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      expect(category.props).toMatchObject(props);
      expect(category.props).toStrictEqual(props);
    });
    test("Only with name", () => {
      const category = new Category({ name: 'valid_name' });
      const categoryProps = omit(category.props, 'createdAt');
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(categoryProps).toStrictEqual( { name: 'valid_name', isActive: true, description: null });
    });
    test("With isActiva false", () => {
      const category = new Category({ name: 'valid_name', isActive: false });
      expect(category.isActive).toBeFalsy();
    });
    test("With uniqueEntityId null, undefined and valid one", () => {
      type CategoryData = { props: CategoryProperties, uniqueEntityId?: UniqueEntityId };
      const dataList: CategoryData[] = [
        { props: { name: 'valid_name', isActive: false } },
        { props: { name: 'valid_name', isActive: false }, uniqueEntityId: null },
        { props: { name: 'valid_name', isActive: false }, uniqueEntityId: undefined },
        { props: { name: 'valid_name', isActive: false }, uniqueEntityId: new UniqueEntityId() },
      ];

      dataList.forEach(element => {
        const category = new Category(element.props, element.uniqueEntityId);
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      });
    });
  });
  describe("Getters and Setters", () => {
    test("Name", () => {
      const category = new Category({ name: 'valid_name' });
      expect(category.name).toBe("valid_name");
    });
    test("Description", () => {
      const category = new Category({ name: 'valid_name' });
      category['description'] = "valid_description";
      expect(category.description).toBe("valid_description");
      category['description'] = undefined;
      expect(category.description).toBe(null);
    });
    test("IsActive", () => {
      const category = new Category({ name: 'valid_name' });
      expect(category.isActive).toBeTruthy();
      category['isActive'] = false;
      expect(category.isActive).toBeFalsy();
      category['isActive'] = true;
      expect(category.isActive).toBeTruthy();
      category['isActive'] = undefined;
      expect(category.isActive).toBeTruthy();
      category['isActive'] = null;
      expect(category.isActive).toBeTruthy();
    });
    test("CreatedAt", () => {
      let category = new Category({ name: 'valid_name' });
      expect(category.createdAt).toBeInstanceOf(Date);
      const createdAt = new Date();
      category = new Category({ name: 'valid_name', createdAt });
      expect(category.createdAt).toBe(createdAt);
    });
  })
})