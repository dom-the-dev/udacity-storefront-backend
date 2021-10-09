import express, {Request, Response} from "express";
import {UserPrototype, UserStore} from "../models/users";
import {authenticate} from "../middleware/authMiddleware";

const router = express.Router();
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
};

const create = async (req: Request, res: Response) => {

    const user: UserPrototype = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };

    const newUser = await store.create(user);
    res.json(newUser);
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
};

const login = async (req: Request, res: Response) => {
    const {firstname, lastname, password} = req.body
    const token = await store.login(firstname, lastname, password)

    res.json(token)
}

router.route("/login").post(login);
router.route("/").get(authenticate, index);
router.route("/:id").get(authenticate, show);
router.route("/").post(authenticate, create);
router.route("/:id").delete(authenticate, destroy);

export default router;