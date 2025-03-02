const express = require('express');
const Recipe = require('../Models/Recipe');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create Recipe
router.post('/', verifyToken, async (req, res) => {
  try {
    const newRecipe = new Recipe({ ...req.body, user: req.user.id });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Recipe by ID
router.get('/search', async (req, res) => {
    try {
      const { title, ingredients, category, cookingTime, difficulty } = req.query;
  
      let filter = {};
  
      if (title) {
        filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      }
      if (category) {
        filter.category = category;
      }
      if (cookingTime) {
        filter.cookingTime = { $lte: parseInt(cookingTime) }; // Filter recipes within cooking time
      }
      if (difficulty) {
        filter.difficulty = difficulty;
      }
      if (ingredients) {
        filter.ingredients = { $all: ingredients.split(',') }; // Search for recipes that include all ingredients
      }
  
      const recipes = await Recipe.aggregate([{ $match: filter }]);
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Update Recipe
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Recipe
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
