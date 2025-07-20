import { Repository } from "./repository";

export class Service {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  async findKeywords(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      return await this.repository.findKeywords(filter, options);
    } catch (error: any) {
      throw new Error(error.message || "Error in findKeywords");
    }
  }

  async addKeyword(keyword: Record<string, unknown>): Promise<any> {
    try {
      return await this.repository.addKeyword(keyword);
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeyword");
    }
  }

  async findKeywordUse(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      return await this.repository.findKeywordUse(filter, options);
    } catch (error: any) {
      throw new Error(error.message || "Error in findKeywordUse");
    }
  }

  async addKeywordUse(keywordUse: Record<string, unknown>): Promise<any> {
    try {
      return await this.repository.addKeywordUse(keywordUse);
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeywordUse");
    }
  }
}
