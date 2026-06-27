const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    await product.save();

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      updatedProduct
    });

  } catch (err) {
  console.error(err);

  res.status(500).json({
    message: err.message,
    error: err
  });
}
});
// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
module.exports = router;