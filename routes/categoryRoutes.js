const express = require("express");
const Category = require("../models/category");

const router = express.Router();

console.log("Category Routes Loaded");


// =======================
// CREATE CATEGORY
// =======================
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category Already Exists"
      });
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      message: "Category Added Successfully",
      category
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// =======================
// GET ALL CATEGORIES
// =======================
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// =======================
// UPDATE CATEGORY
// =======================
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.status(200).json({
      message: "Category Updated Successfully",
      updatedCategory
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// =======================
// DELETE CATEGORY
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


// EXPORT ROUTER
module.exports = router;