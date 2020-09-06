import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserRo } from './users.ro';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  userName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 20, select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toResponseObject(showToken = true): UserRo {
    const {id, name, email,userName, isActive, createdAt, updatedAt, deletedAt} = this;
    return  {
      id,
      name,
      email,
      userName,
      isActive,
      createdAt,
      updatedAt,
      deletedAt
    };
  }
}
