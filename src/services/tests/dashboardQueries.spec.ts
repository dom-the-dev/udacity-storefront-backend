import {DashboardQueries} from "../dashboardQueries";

const store = new DashboardQueries();

describe("Dashboard Queries", () => {
    it("should have an method to get products by category", () => {
        expect(store.productsByCategory).toBeDefined();
    });
});
