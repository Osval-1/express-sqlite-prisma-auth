import { login } from "../controllers/authentication/login";
import { signup } from "../controllers/authentication/signup";
import { getUsers } from "../controllers/authentication/get_all_users";
import { updatePassword } from "../controllers/authentication/update_password";
import express from "express"


const router = express.Router();

router.post("/signup",signup );
router.post("/login", login);
router.get("/getUsers", getUsers);
router.post("/updatePassword", updatePassword);


export default router;
