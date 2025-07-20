import { Schema, model } from "mongoose";

export interface KeywordUse {
  keyword: string;
  user: string;
}

export const keywordUseSchema = new Schema<KeywordUse>({
  keyword: { type: String, required: true },
  user: { type: String, required: true },
});

export const keywordUseModel = model<KeywordUse>(
  "KeywordUse",
  keywordUseSchema,
);
