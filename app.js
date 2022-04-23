import { sequelize } from "./database/database.js";
import express  from "express";

const app = express()

import routes from "./routes/index.js"

app.use(express.json())
app.use('/v1',routes);

export default app