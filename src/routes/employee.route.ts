import { Router, type Request, type Response } from 'express';
import employeeRepository from '../repositories/empoyee.repository';

export const employeeRouter = Router();

employeeRouter.get("/" , async (_req: Request, res: Response) => {
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
