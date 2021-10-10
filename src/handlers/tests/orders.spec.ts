import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import {Order, OrderStore} from "../../models/orders";
import {User, UserStore} from "../../models/users";
import {Product, ProductStore} from "../../models/products";

const request = supertest(app);
const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

dotenv.config();

const {TOKEN_SECRET} = process.env;

describe("Order Handler", () => {

    let user: User;
    let order: Order;
    let product: Product;
    let token: string;

    beforeAll(async () => {
        user = await userStore.create({
            "firstname": "Dominik",
            "lastname": "Amrugiewicz",
            "password": "password"
        });

        // @ts-ignore
        token = jwt.sign(user, TOKEN_SECRET);

        product = await productStore.create({name: "Product", price: "19.00", category: "Shoes"});

        order = await store.create({
            user_id: user.id,
            products: [
                {
                    product_id: product.id,
                    quantity: 10
                }
            ],
            order_completed: false
        });
    });

    it("index should response with status 200", async () => {
        const response = await request.get("/api/orders");
        expect(response.statusCode).toBe(401);
    });

    it("index should response with status 200", async () => {
        const response = await request.get("/api/orders").set("Authorization", "bearer " + token);
        expect(response.statusCode).toBe(200);
    });

    it("show should response an order", async () => {
        const response = await request.get(`/api/orders/${order.id}`).set("Authorization", "bearer " + token);
        expect(response.body).toEqual({id: 1, user_id: "1", completed: false});
    });

    it("should delete an order", async () => {
        const order = await store.create({
            user_id: user.id,
            products: [
                {
                    product_id: product.id,
                    quantity: 10
                }
            ],
            order_completed: false
        });
        const response = await request
            .delete(`/api/orders/${order.id}`)
            .set("Authorization", "bearer " + token);

        expect(response.body).toEqual({"message": "Order successfully deleted"});
    });

    it("showCurrentUserOrders should response an order", async () => {
        const response = await request.get(`/api/orders/user/${user.id}`).set("Authorization", "bearer " + token);
        expect(response.body).toEqual({id: 1, user_id: "1", completed: false});
    });

    it("showCompletedUserOrders should response empty body", async () => {
        const response = await request.get(`/api/orders/${order.id}/completed`).set("Authorization", "bearer " + token);

        expect(response.body).toEqual({});
    });


    afterAll(async () => {

        await userStore.delete(user.id);
        await productStore.delete(product.id);
        await store.delete(order.id);

    });

});