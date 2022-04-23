import { sequelize } from "./database/database.js";
import app  from "./app.js";
let port = 4000;

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