const express = require("express");
const Order = require("../models/order");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "Order Created Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// GET ORDER BY ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found"
      });
    }

    res.status(200).json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
// UPDATE ORDER
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order Not Found"
      });
    }

    res.status(200).json({
      message: "Order Updated Successfully",
      updatedOrder
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order Not Found"
      });
    }

    res.status(200).json({
      message: "Order Deleted Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
module.exports = router;