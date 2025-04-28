import type { Repository } from 'typeorm';
import type { Person } from '../entities/person';

export class PersonService {
  private personRepository: Repository<Person>;

  constructor(personRepo: Repository<Person>) {
    this.personRepository = personRepo;
  }

  async getAllPersons(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async getPersonById(id: string): Promise<Person | null> {
    return this.personRepository.findOneBy({ id });
  }

  async getPersonByName(firstName?: string, lastName?: string): Promise<Person | null> {
    const queryBuilder = this.personRepository.createQueryBuilder('person');

    if (firstName) {
      queryBuilder.andWhere('person.firstName LIKE :firstName', { firstName: `%${firstName}%` });
    }

    if (lastName) {
      queryBuilder.andWhere('person.lastName LIKE :lastName', { lastName: `%${lastName}%` });
    }

    return await queryBuilder.getOne();
  }

  async createPerson(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }

  async updatePerson(
    id: string,
    person: Partial<Person>
  ): Promise<Person | null> {
    await this.personRepository.update(id, person);
    return this.getPersonById(id);
  }
}