import { KeywordRepository } from "../repositories/keywordsRepository";

export class KeywordsService {
  private repository: KeywordRepository;

  constructor(repository: KeywordRepository) {
    this.repository = repository;
  }

  async findGroups(
    filter: Record<string, unknown> = {},
    options: object = {},
  ): Promise<any[]> {
    try {
      return await this.repository.findGroups(filter, options);
    } catch (error: any) {
      throw new Error(error.message || "Error in findGroups");
    }
  }

  async addKeyword(keyword: Record<string, unknown>): Promise<any> {
    try {
      // Assuming the repository has a method to add a keyword
      return await this.repository.model.create(keyword);
    } catch (error: any) {
      throw new Error(error.message || "Error in addKeyword");
    }
  }
}
