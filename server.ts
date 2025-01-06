import express,{Application} from "express"
import dotenv from "dotenv"
import cors, { CorsOptions } from "cors"
import auth from "./src/routes/auth.route"
import { PrismaClient } from "@prisma/client"

dotenv.config()

const app:Application = express();
const corsOptions:CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
export const prisma = new PrismaClient(); 
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", auth);


app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
