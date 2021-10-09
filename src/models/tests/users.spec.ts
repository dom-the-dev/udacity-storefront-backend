import {User, UserPrototype, UserStore} from "../users";

const store = new UserStore();

const dummyUser: UserPrototype = {
    "firstname": "Dominik",
    "lastname": "Amrugiewicz",
    "password": "safe-password"
}

describe("User Model", () => {
    let user: User;

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

        await store.delete(newUser.id)
    });

    it("should return one user", async () => {
        user = await store.create(dummyUser);

        const showUser = await store.show(user.id);

        expect(showUser.firstname).toEqual("Dominik")
        expect(showUser.lastname).toEqual("Amrugiewicz")

        await store.delete(user.id)
    })

    it("delete method delete a user", async () => {
        user = await store.create(dummyUser);

        const result = await store.delete(user.id);
        expect(result).toEqual("User successfully deleted");

        await store.delete(user.id)
    });
});
