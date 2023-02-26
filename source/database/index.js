const mongoose = require("mongoose");
const { MONGODB_URI } = require("../configs");
const repository = require("./repository");

repository.connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Error ON Database Connection");
    console.log(error);
  }
};

module.exports = repository;
