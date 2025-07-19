import mongoose from "mongoose";

const keywordSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
});

export default mongoose.model("Keyword", keywordSchema);
