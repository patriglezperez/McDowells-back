let router  = require('express').Router();

router.get("/:id", require("../controllers/orders/getOrder"));
router.get("/active", require("../controllers/orders/getStatus")); 
router.get("/kitchen", require("../controllers/orders/getKitchenProcess"));

router.get("/delivered", require("../controllers/orders/getDeliveredDate"));
router.get("/delivering", require("../controllers/orders/getDelivering"));
 
router.put("/stop/:id", require("../controllers/orders/putCancelled"));
router.put("/cancel/:id", require("../controllers/orders/putPaused"));
router.put("/finish/:id", require("../controllers/orders/putDelivered"));

router.post("/new", require("../controllers/orders/postNewOrder")); 


module.exports= router;