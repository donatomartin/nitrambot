import { Mongoose } from "mongoose";
import Keyword from "../model/keyword";

export class KeywordRepository {
  private mongoose: Mongoose;
  private uri: string;
  private readonly collectionName = "keywords";

  constructor(mongoose: Mongoose, uri: string) {
    this.mongoose = mongoose;
    this.uri = uri;
  }

  private async checkUp(): Promise<void> {
    if (this.mongoose.connection.readyState !== 1) {
      await this.mongoose.connect(this.uri);
    }
  }

  async findGroups(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      await this.checkUp();
      const cursor = this.mongoose.connection
        .collection(this.collectionName)
        .find(filter, options);
      return await cursor.toArray();
    } catch (error: any) {
      throw new Error(error.message || "Error in findGroups");
    }
  }

  async addKeyword(keyword: Record<string, unknown>): Promise<any> {
    try {
      await this.checkUp();
      const existingKeyword = await this.mongoose.connection
        .collection(this.collectionName)
        .findOne({ keyword: keyword.keyword });

      if (existingKeyword) {
        throw new Error("Keyword already exists");
      }

      const result = await this.mongoose.connection
        .collection(this.collectionName)
        .insertOne(keyword);
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeyword");
    }
  }

  // Optional: expose Keyword model if needed
  get model() {
    return Keyword;
  }
}
