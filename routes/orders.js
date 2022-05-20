let router  = require('express').Router();


router.get("/:id", require("../controllers/orders/getOrder"));
router.get("/status/:status", require("../controllers/orders/getStatus")); 
router.get("/delivery/delivered", require("../controllers/orders/getDeliveredDate")); 
//router.get("/kitchen", require("../controllers/orders/getKitchenProcess"));
router.get("/delivering", require("../controllers/orders/getDelivering"));
router.get("/track/history", require("../controllers/orders/getOrderHistory")); 

router.patch("/kitchen", require("../controllers/orders/patchKitchenProcess"));
router.patch("/stop/:id", require("../controllers/orders/patchPaused"));
router.patch("/cancel/:id", require("../controllers/orders/patchCancelled"));
router.patch("/finish/:id", require("../controllers/orders/patchFinish"));

router.post("/new", require("../controllers/orders/postNewOrder"));
router.post("/receipt", require("../controllers/orders/postNewOrder"));

module.exports= router;