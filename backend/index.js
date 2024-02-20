import express from "express";
import cors from "cors";
import Config from "./config/Config.js";
import UserRoute from "./routes/UserRoute.js";
import ShiftRoute from "./routes/ShiftRoute.js";
import GroupRoute from "./routes/GroupRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TargetRoute from "./routes/TargetRoute.js";
import ProductionRoute from "./routes/ProductionRoute.js";
import GrammageRoute from "./routes/GrammageRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ShiftRoute);
app.use(GroupRoute);
app.use(ProductRoute);
app.use(TargetRoute);
app.use(ProductionRoute);
app.use(GrammageRoute);

app.listen(Config.port, () => console.log("Server up and running ... "));
