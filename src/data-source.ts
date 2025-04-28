import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'new-journey.db',
  entities: ['src/entities/*.ts'],
  synchronize: true,
})