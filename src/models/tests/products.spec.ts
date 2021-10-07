import {ProductStore} from "../products";

const store = new ProductStore()

describe("Product Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined()
    })

    it("index method should return a list of products", async () => {
        const result = await store.index()
        expect(result).toEqual([])
    })

    it("index method should return a list of products", async () => {
        const result = await store.create({name: "Product", price: 19.00, category: "Shoes"})
        expect(result).toEqual({id: 1, name: "Product", price: 19.00, category: "Shoes"})
    })
})