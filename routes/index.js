const router = require("express").Router();

//Ejemplo para ver que funciona
router.get("/", (req, res) => {
  res.send("Hello word");
});

module.exports = router;
