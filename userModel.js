const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["agent", "user"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);


// module.exports = userSchema