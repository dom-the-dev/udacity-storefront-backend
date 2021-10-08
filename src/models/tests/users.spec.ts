import {UserStore} from "../users";

const store = new UserStore();

describe("User Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("index method should return a list of users", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should create a user", async () => {
        const user = {
            "firstName": "Dominik",
            "lastName": "Amrugiewicz",
            "password": "safe-password"
        };
        const newUser = await store.create(user);

        expect(newUser).toEqual({
            "id": 1,
            "firstName": "Dominik",
            "lastName": "Amrugiewicz",
            "password": "safe-password"
        });
    });

    it("delete method delete a user", async () => {

    });
});
