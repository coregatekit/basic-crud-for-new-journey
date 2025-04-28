import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Person } from './person';
import { Position } from './position';

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

  @Column({ name: 'started_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  startedAt!: Date;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @ManyToOne(() => Position, (position) => position.employees)
  @JoinColumn({ name: 'position_id' })
  position!: Position;

  @Column({ name: 'active', type: 'boolean', default: true })
  active!: boolean;

  @Column({ name: 'created_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'time', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}