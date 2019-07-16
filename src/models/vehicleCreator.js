import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vehicleCreatorSchema = new Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "admins"
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vehicles"
  }
});

const myDB = mongoose.connection.useDb(
  process.env.ENV === "development" ? process.env.DEV_DB : process.env.PROD_DB
);

export default myDB.model("vehicle_creators", vehicleCreatorSchema);
