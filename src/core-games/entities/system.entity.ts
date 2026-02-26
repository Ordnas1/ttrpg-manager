import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  edition?: string;

  @Column({ nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  description?: string;
}
