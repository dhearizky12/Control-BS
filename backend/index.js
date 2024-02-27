import express from "express";
import cors from "cors";
import path from "path";
import Config from "./config/Config.js";
import UserRoute from "./routes/UserRoute.js";
import WorkingHourRoute from "./routes/WorkingHourRoute.js";
import ShiftRoute from "./routes/ShiftRoute.js";
import GroupRoute from "./routes/GroupRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TargetRoute from "./routes/TargetRoute.js";
import ProductionRoute from "./routes/ProductionRoute.js";
import GrammageRoute from "./routes/GrammageRoute.js";

import db from "./config/Database.js";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use(UserRoute);
apiRouter.use(WorkingHourRoute);
apiRouter.use(ShiftRoute);
apiRouter.use(GroupRoute);
apiRouter.use(ProductRoute);
apiRouter.use(TargetRoute);
apiRouter.use(ProductionRoute);
apiRouter.use(GrammageRoute);

await db.sync();

app.use("/api", apiRouter);

app.use(express.static(Config.publicFolder));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(`${Config.publicFolder}/index.html`));
});

app.listen(Config.port, () => console.log(`Server up and running on port ${Config.port} ... `));
