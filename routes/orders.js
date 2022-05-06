let router  = require('express').Router();


router.get("/:id", require("../controllers/orders/getOrder"));
router.get("/active", require("../controllers/orders/getStatus")); 
router.get("/delivered", require("../controllers/orders/getDeliveredDate")); 
router.get("/kitchen", require("../controllers/orders/getKitchenProcess"));
router.get("/delivering", require("../controllers/orders/getDelivering"));
router.get("/history", require("../controllers/orders/getHistoryOrders")); 
 
router.patch("/stop/:id", require("../controllers/orders/patchPaused"));
router.patch("/cancel/:id", require("../controllers/orders/patchCancelled"));
router.patch("/finish/:id", require("../controllers/orders/patchFinish"));

router.post("/new", require("../controllers/orders/postNewOrder")); 


module.exports= router;