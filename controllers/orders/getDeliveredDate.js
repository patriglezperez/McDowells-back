const orderManager = require("../../manager/orders");

async function getDeliveredDate(req, res) {
  const dateDayNow = new Date().toISOString().split("T")[0]; // YYYY-MM-DD now
  console.log("Esta es la fecha de hoy", dateDayNow);
  try {
    const orders = new orderManager();
    console.log("que pitna por pantalla", orders);
    const deliveredDay = await orders.getOrderByDay(dateDayNow);

    const finished = deliveredDay.rows.filter((order) => {
      return order.statuss !== "finished";
    });

    if (finished) {
      res.json({ finished: finished });
    } else {
      res.status(404).json("Not found");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
}

module.exports = getDeliveredDate;
