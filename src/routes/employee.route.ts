import { Router, type Request, type Response } from "express";
import employeeRepository from "../repositories/empoyee.repository";
import { generateEmployeeCode } from "../utils/generator";
import positionRepository from "../repositories/position.repository";
import personRepository from "../repositories/person.repository";

export const employeeRouter = Router();

employeeRouter.get("/", async (_req: Request, res: Response) => {
  const employees = await employeeRepository.find();
  if (employees.length === 0) {
    res.status(404).json({ message: "No employees found" });
    return;
  }

  res.status(200).json(employees);
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  const employee = await employeeRepository.findOneBy({ id });

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(employee);
});

employeeRouter.post("/", async (req: Request, res: Response) => {
  const { salary, email, startedAt, personId, positionId } = req.body;

  if (!salary) {
    res.status(400).json({ message: "Salary is required" });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  if (!startedAt) {
    res.status(400).json({ message: "Started date is required" });
    return;
  }
  if (startedAt) {
    const date = new Date(startedAt);
    if (Number.isNaN(date.getTime())) {
      res.status(400).json({ message: "Invalid started date" });
      return;
    }
  }

  if (!personId) {
    res.status(400).json({ message: "Person ID is required" });
    return;
  }

  if (personId) {
    const person = await personRepository.findOneBy({ id: personId });
    if (!person) {
      res.status(404).json({ message: "Person not found" });
      return;
    }
  }

  if (!positionId) {
    res.status(400).json({ message: "Position ID is required" });
    return;
  }

  if (positionId) {
    if (Number.isNaN(Number(positionId))) {
      res.status(400).json({ message: "Invalid position ID" });
      return;
    }
    const position = await positionRepository.findOneBy({ id: positionId });
    if (!position) {
      res.status(404).json({ message: "Position not found" });
      return;
    }
  }

  const employee = employeeRepository.create({
    code: generateEmployeeCode("EM"),
    salary,
    email,
    startedAt: startedAt,
    person: { id: personId },
    position: { id: positionId },
  });

  await employeeRepository.save(employee);
  res.status(201).json(employee);
});

employeeRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  const employee = await employeeRepository.findOneBy({ id });
  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  const { salary, email, active } = req.body;

  if (salary) {
    employee.salary = Number(salary);
  }
  if (email) {
    employee.email = String(email);
  }
  if (active) {
    employee.active = Boolean(active);
  }

  await employeeRepository.save(employee);
  res.status(200).json(employee);
});

employeeRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  const employee = await employeeRepository.findOneBy({ id });
  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  await employeeRepository.remove(employee);
  res.status(200).json({ message: "Employee deleted successfully" });
});
