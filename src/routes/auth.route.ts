import { login } from "../controllers/authentication/login";
import { signup } from "../controllers/authentication/signup";
import express from "express"


const router = express.Router();

router.post("/signup",signup );
router.post("/login", login);


export default router;
