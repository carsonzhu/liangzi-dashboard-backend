import mongoose, { Schema } from "mongoose";

const insuranceCreatorSchema = new Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "admins"
  },
  insuranceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "insurances"
  }
});

const myDB = mongoose.connection.useDb(
  process.env.ENV === "development" ? process.env.DEV_DB : process.env.PROD_DB
);

export default myDB.model("insurance_creators", insuranceCreatorSchema);
