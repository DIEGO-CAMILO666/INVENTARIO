const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      "mongodb+srv://dcmr3401:12345@cluster1.ny74jfa.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(url);
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
    getConnection
}