import { Application, Request, Response } from "express";
import { Service } from "./service";

export class Controller {
  constructor(
    private app: Application,
    private keywordsService: Service,
  ) {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.get("/keywords", this.getKeywords.bind(this));
    this.app.post("/keywords", this.createKeyword.bind(this));
    this.app.get("/keyword-use", this.getKeywordUse.bind(this));
    this.app.post("/keyword-use", this.createKeywordUse.bind(this));
  }

  private async getKeywords(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query || {};
      const options = { projection: { _id: 0 } }; // Adjust as needed
      const groups = await this.keywordsService.findKeywords(filter, options);
      res.status(200).json(groups);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }

  private async createKeyword(req: Request, res: Response): Promise<void> {
    try {
      const keyword = req.body;
      if (!keyword || !keyword.keyword) {
        res.status(400).json({ error: "Keyword name is required" });
        return;
      }

      const addedKeyword = await this.keywordsService.addKeyword(keyword);
      res.status(201).json(addedKeyword);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }

  private async getKeywordUse(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query || {};
      const options = { projection: { _id: 0 } }; // Adjust as needed
      const keywordUse = await this.keywordsService.findKeywordUse(
        filter,
        options,
      );
      res.status(200).json(keywordUse);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }

  private async createKeywordUse(req: Request, res: Response): Promise<void> {
    try {
      const keywordUse = req.body;

      const addedKeywordUse =
        await this.keywordsService.addKeywordUse(keywordUse);
      res.status(201).json(addedKeywordUse);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
}
