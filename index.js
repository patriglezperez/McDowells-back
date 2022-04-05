const express = require("express");
const app = express();
const port = 3000;

//Routes
app.use("/api", require("./routes/index"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
