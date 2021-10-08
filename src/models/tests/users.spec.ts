import {UserStore} from "../users";

const store = new UserStore();

const password = "safe-password"
const dummyUser = {
    "id": 1,
    "firstname": "Dominik",
    "lastname": "Amrugiewicz",
    "password": password
}

describe("User Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("index method should return a list of users", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should create a user", async () => {

        const newUser = await store.create(dummyUser);

        expect(newUser.firstname).toEqual("Dominik")
        expect(newUser.lastname).toEqual("Amrugiewicz")
    });

    it("should return one user", async () => {
        await store.create(dummyUser);
        const user = await store.show("1");

        expect(user.firstname).toEqual("Dominik")
        expect(user.lastname).toEqual("Amrugiewicz")
    })

    it("delete method delete a user", async () => {
        const result = await store.delete("1");
        expect(result).toEqual("User successfully deleted");
    });
});
