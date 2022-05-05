import app  from "./app.js";
import { sequelize } from "./database/database.js";
let port = 4000;


import './models/staff.js';
import './models/menu.js';
import './models/orders.js';

async function main() {
  try {
    await sequelize.sync({force : true})
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('unable to connect', error)
  }
}

main();