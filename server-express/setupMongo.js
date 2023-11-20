const mongoose = require("mongoose");
const uri = process.env.CONNECTION_STRING;
function connect() {
  const options = { };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;