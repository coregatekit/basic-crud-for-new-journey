import { Router, type Request, type Response } from "express";
import personRepository from "../repositories/person.repository";

export const personRouter = Router();

personRouter.get("/", async (_req: Request, res: Response) => {
  const persons = await personRepository.find();

  if (persons.length === 0) {
    res.status(404).json({ message: "No persons found" });
    return;
  }

  res.status(200).json(persons);
});

personRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const person = await personRepository.findOneBy({ id });

  if (!person) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  res.status(200).json(person);
});
