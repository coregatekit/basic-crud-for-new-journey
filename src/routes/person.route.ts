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

personRouter.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, gender, dateOfBirth, email, phoneNumber } =
    req.body;

  if (!firstName) {
    res.status(400).json({ message: "First name is required" });
    return;
  }

  if (!lastName) {
    res.status(400).json({ message: "Last name is required" });
    return;
  }

  if (!gender) {
    res.status(400).json({ message: "Gender is required" });
    return;
  }

  if (!dateOfBirth) {
    res.status(400).json({ message: "Date of birth is required" });
    return;
  }

  if (dateOfBirth) {
    const date = new Date(dateOfBirth);
    if (Number.isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid date of birth" });
      return;
    }
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  if (!phoneNumber) {
    res.status(400).json({ message: "Phone number is required" });
    return;
  }

  const person = await personRepository.create({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
  });

  if (!person) {
    res.status(400).json({ message: "Error creating person" });
    return;
  }

  await personRepository.save(person);
  res.status(201).json(person);
});

personRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  const person = await personRepository.findOneBy({ id });
  if (!person) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  const { firstName, lastName, email, phoneNumber } = req.body;
  if (firstName) {
    person.firstName = firstName;
  }
  if (lastName) {
    person.lastName = lastName;
  }
  if (email) {
    person.email = email;
  }
  if (phoneNumber) {
    person.phoneNumber = phoneNumber;
  }

  await personRepository.save(person);
  res.status(200).json(person);
});

personRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  const person = await personRepository.findOneBy({ id });
  if (!person) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  await personRepository.remove(person);
  res.status(200).json({ message: "Person deleted successfully" });
});
