import { omit } from "lodash";
import { Category, CategoryProperties } from "./category"
import { validate as uuidValidate, v4 as uuidv4  } from 'uuid'

describe("Category :: Unit Test", () => {
  describe("Constructor", () => {
    test("With all properties", () => {
      const date = new Date();
      const props = { name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date };
      const id = uuidv4();
      const category = new Category({ name: 'valid_name', isActive: true, description: 'valid_description', createdAt: date }, id );
      expect(category.name).toBe("valid_name");
      expect(category.isActive).toBeTruthy();
      expect(category.description).toBe("valid_description");
      expect(category.createdAt).toBe(date);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
      expect(category.id).toBe(id);
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
    test("With id null, undefined and valid one", () => {
      type CategoryData = { props: CategoryProperties, id?: string };
      const dataList: CategoryData[] = [
        { props: { name: 'valid_name', isActive: false } },
        { props: { name: 'valid_name', isActive: false }, id: null },
        { props: { name: 'valid_name', isActive: false }, id: undefined },
        { props: { name: 'valid_name', isActive: false }, id: 'cef09e16-7422-4f5a-9a40-bf93c1ce4803' },
      ];

      dataList.forEach(element => {
        const category = new Category(element.props, element.id);
        expect(category.id).not.toBeNull();
        expect(uuidValidate(category.id)).toBeTruthy();
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