import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poilistSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Poilist = Mongoose.model("Poilist", poilistSchema);