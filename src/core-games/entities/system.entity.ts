import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column('date')
  releaseDate!: Date;

  @Column({ nullable: true })
  edition?: string;

  @Column({ nullable: true })
  publisher?: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;
}
