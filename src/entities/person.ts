import { Column, Entity } from 'typeorm';

@Entity({ name: 'persons' })
export class Person {
  @Column({ primary: true, generated: 'uuid' })
  id!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName!: string;

  @Column({ name: 'gender', type: 'char', length: 1, nullable: false })
  gender!: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: false })
  dateOfBirth!: Date;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false })
  email!: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 15, nullable: false })
  phoneNumber!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}