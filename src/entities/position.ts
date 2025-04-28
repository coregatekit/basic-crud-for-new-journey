import { Column, Entity } from 'typeorm';

@Entity({ name: 'positions' })
export class Position {
  @Column({ primary: true, generated: 'increment' })
  id!: number;

  @Column({ name: 'title', type: 'varchar', length: 100, nullable: false })
  title!: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}