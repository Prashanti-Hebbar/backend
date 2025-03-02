const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    servings: { type: Number, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        notes: String
    }],
    instructions: [{ type: String, required: true }],
    nutritionalInfo: {
        calories: String,
        fat: String,
        protein: String,
        carbs: String
    },
    dietaryInfo: [String],
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
