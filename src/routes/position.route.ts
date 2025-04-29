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

positionRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const position = await positionRepository.findOneBy({ id: Number(id) });

  if (!position) {
    res.status(404).json({ message: "Position not found" });
    return;
  }
  res.status(200).json(position);
});

positionRouter.post("/", async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Name and description are required" });
    return;
  }

  const newPosition = positionRepository.create({ title });
  await positionRepository.save(newPosition);
  res.status(201).json(newPosition);
});
