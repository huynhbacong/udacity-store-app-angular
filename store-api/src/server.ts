import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productRoutes } from "./handlers/productsHandler";
import { userRoutes } from "./handlers/userHandler";
import { orderRoutes } from "./handlers/ordersHandler";
import { dashboardRoutes } from "./handlers/dashboardHandler";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("My StoreFront app");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
