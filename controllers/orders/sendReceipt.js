async function sendReceiptEmail(req, res) {
    try {
        const orders = new ordersManager;
        const emailSent = await orders.sendReceipt(req.body);
        if (emailSent) {
            res.status(200).json({"emailSent": emailSent});
        } else {
            res.status(500).json("Server Error");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = sendReceiptEmail;