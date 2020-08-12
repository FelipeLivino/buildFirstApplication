import "reflect-metadata";
import express from "express";
import routes from "./routes";
import uplodadConfig from "./config/upload";

import "./database";

const app = express();

app.use(express.json());
app.use("/files", express.static(uplodadConfig.directoey));
app.use(routes);

app.listen(3333, () => {
    console.log("init server");
});
