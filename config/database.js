const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL
  
,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("Successfully connected to DB");
});

module.exports = db;