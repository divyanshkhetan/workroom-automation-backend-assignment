const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}
export default User;
