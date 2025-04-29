import { Router, type Request, type Response } from "express";

export const personRouter = Router();

personRouter.get("/", async (_req: Request, res: Response) => {
  res.status(501).json({ message: "Not implement yet!" });
});
