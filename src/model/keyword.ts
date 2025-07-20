import { Schema, model } from "mongoose";

export interface Keyword {
  keyword: string;
}

export const keywordSchema = new Schema<Keyword>({
  keyword: { type: String, required: true, unique: true },
});

export const keywordModel = model<Keyword>("Keyword", keywordSchema);
