import Mongoose from "mongoose";

const { Schema } = Mongoose;

const featureSchema = new Schema({
  description: String,
  location: String,
  category: Number,
  poilistid: {
    type: Schema.Types.ObjectId,
    ref: "Poilist",
  },
});

export const Feature = Mongoose.model("Feature", featureSchema);