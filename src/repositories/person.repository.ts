import { AppDataSource } from "../data-source";
import { Person } from "../entities/person";

const personRepository = AppDataSource.getRepository(Person);

export default personRepository;
