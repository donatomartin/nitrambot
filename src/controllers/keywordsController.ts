import { Application, Request, Response } from "express";
import { KeywordsService } from "../services/keywordsService";

export class KeywordsController {
  constructor(
    private app: Application,
    private keywordsService: KeywordsService,
  ) {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.get("/keywords", this.getKeywords.bind(this));
    this.app.post("/keywords", this.createKeyword.bind(this));
  }

  private async getKeywords(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query || {};
      const options = { projection: { _id: 0 } }; // Adjust as needed
      const groups = await this.keywordsService.findGroups(filter, options);
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
}
