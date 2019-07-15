import Mongoose from "mongoose/Mongoose";
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

export default Mongoose;
