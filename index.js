import { sequelize } from "./database/database.js";
import app from './app.js'

const port = 3000;

import './models/menu.js';
import './models/orders.js';
import './models/staff.js';

async function main() {
  try {
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('unable to connect', error)
  }
}

main();


//Routes
/* app.use("/api", require("./routes/index"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); */
