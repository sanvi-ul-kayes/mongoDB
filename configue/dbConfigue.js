const { default: mongoose } = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://mern:mern@cluster0.roq7l.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnect;
