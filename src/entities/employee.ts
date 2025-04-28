import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Person } from './person';

@Entity({ name: 'employees'})
export class Employee {
  @Column({ primary: true, generated: 'uuid' })
  id!: string;

  @Column({ name: 'code', type: 'varchar', length: 10, nullable: false })
  code!: string;

  @Column({ name: 'salary', type: 'decimal', precision: 10, scale: 2, nullable: false })
  salary!: number;

  @Column({ name: 'varchar', length: 100, nullable: false })
  email!: string;

  @Column({ name: 'started_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt!: Date;

  @OneToOne(() => Person)
  @JoinColumn()
  person!: Person;

  @Column({ name: 'position_id', type: 'int', nullable: false })
  positionId!: number;

  @Column({ name: 'active', type: 'boolean', default: true })
  active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}