import {OrderStore} from "../orders";
import {User, UserStore} from "../users";
import {Product, ProductStore} from "../products";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("Order Model", () => {

    let user: User;
    let product: Product;

    beforeAll(async () => {
        user = await userStore.create({
            "firstname": "Dominik",
            "lastname": "Amrugiewicz",
            "password": "password"
        })

        product = await productStore.create({name: "Product", price: "19.00", category: "Shoes"})
    })

    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("index method should return a list of order", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should create an order", async () => {
        const result = await store.create({
            user_id: user.id,
            products: [
                {
                    product_id: product.id,
                    quantity: 10
                }
            ],
            order_completed: false
        });

        expect(result.id).toEqual(1)
    });

    afterAll(async () => {
        await userStore.delete(user.id)
        await productStore.delete(product.id)
    })

});
