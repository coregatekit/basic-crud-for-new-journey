import type { Repository } from "typeorm";
import type { Employee } from "../entities/employee";

export class EmployeeService {
  private employeeRepository: Repository<Employee>;

  constructor(employeeRepo: Repository<Employee>) {
    this.employeeRepository = employeeRepo;
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ id });
  }

  async searchEmployeeByCode(code: string): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ code });
  }

  async createEmployee(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async updateEmployee(
    id: string,
    employee: Partial<Employee>
  ): Promise<Employee | null> {
    await this.employeeRepository.update(id, employee);
    return this.getEmployeeById(id);
  }
}
