import { Mongoose } from "mongoose";

export class Repository {
  private mongoose: Mongoose;
  private uri: string;

  private keywordCollection = "keywords";
  private keywordUseCollection = "keywordUse";

  constructor(mongoose: Mongoose, uri: string) {
    this.mongoose = mongoose;
    this.uri = uri;
  }

  private async checkUp(): Promise<void> {
    if (this.mongoose.connection.readyState !== 1) {
      await this.mongoose.connect(this.uri);
    }
  }

  async findKeywords(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      await this.checkUp();
      const cursor = this.mongoose.connection
        .collection(this.keywordCollection)
        .find(filter, options);
      const result = await cursor.toArray();
      console.log(typeof result);
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Error in findGroups");
    }
  }

  async addKeyword(keyword: Record<string, unknown>): Promise<any> {
    try {
      await this.checkUp();
      const existingKeyword = await this.mongoose.connection
        .collection(this.keywordCollection)
        .findOne({ keyword: keyword.keyword });

      if (existingKeyword) {
        throw new Error("Keyword already exists");
      }

      const result = await this.mongoose.connection
        .collection(this.keywordCollection)
        .insertOne(keyword);
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeyword");
    }
  }

  async findKeywordUse(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      await this.checkUp();
      const cursor = this.mongoose.connection
        .collection(this.keywordUseCollection)
        .find(filter, options);
      const result = await cursor.toArray();
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Error in findKeywordUse");
    }
  }

  async addKeywordUse(keywordUse: Record<string, unknown>): Promise<any> {
    try {
      await this.checkUp();
      const result = await this.mongoose.connection
        .collection(this.keywordUseCollection)
        .insertOne(keywordUse);
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeywordUse");
    }
  }
}
