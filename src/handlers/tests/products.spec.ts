import {ProductStore} from "../../models/products";

const store = new ProductStore();

describe("Product Handler", () => {
    it("has a get Route", () => {
        expect(store.index).toBeDefined();
    });

});
