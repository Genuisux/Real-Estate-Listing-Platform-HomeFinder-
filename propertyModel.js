const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
title: String,
  description: String,
  price: Number,
  location: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Property", propertySchema);

// module.exports = propertySchema
