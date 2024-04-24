var mongoose = require("mongoose");


var ProductSchema = mongoose.Schema(
    {
        name: String,
        imageUrl: String,
        description: String,
        price: Number,
        gender: String,
        category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        dateAdded: Date
    }
);
var ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;