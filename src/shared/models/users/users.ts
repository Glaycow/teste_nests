import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'varchar', length: 200})
  name: string;

  @Column({type: 'varchar', length: 200, unique: true} )
  email: string;

  @Column({type: 'varchar', length: 40, unique: true})
  userName: string;

  @Column({type: 'boolean'})
  isActive: boolean;

  @Column({type: 'varchar', length: 20})
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: string;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: string;

  @DeleteDateColumn({type: 'timestamp'})
  deletedAt: string;
}
