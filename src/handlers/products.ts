import express, {Request, Response} from "express";
import {ProductPrototype, ProductStore} from "../models/products";
import {DashboardQueries} from "../services/dashboardQueries";
import {authenticate} from "../middleware/authMiddleware";

const router = express.Router();
const store = new ProductStore();
const dashboard = new DashboardQueries();


const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
};

const create = async (req: Request, res: Response) => {

    const product: ProductPrototype = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json({message: deleted});
};

const productsByCategory = async (req: Request, res: Response) => {
    const products = await dashboard.productsByCategory(req.params.category);
    res.json(products);
};

router.route("/").get(index);
router.route("/:id").get(show);
router.route("/").post(authenticate, create);
router.route("/:id").delete(authenticate, destroy);
router.route("/category/:category").get(productsByCategory);

export default router;
