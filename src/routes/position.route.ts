import { Router, type Request, type Response } from "express";
import positionRepository from "../repositories/position.repository";

export const positionRouter = Router();

positionRouter.get("/", async (_req: Request, res: Response) => {
  const positions = await positionRepository.find();

  if (positions.length === 0) {
    res.status(404).json({ message: "No positions found" });
    return;
  }
  res.status(200).json(positions);
});
