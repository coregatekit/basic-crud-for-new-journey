import { AppDataSource } from "../data-source";
import { Employee } from "../entities/employee";

const employeeRepository = AppDataSource.getRepository(Employee);

export default employeeRepository;
