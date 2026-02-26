import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GameClub {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column('timestamp with time zone')
  createdAt!: Date;

  @Column('boolean')
  isActive!: boolean;

  @Column('boolean')
  isPrivate!: boolean;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column('point', { nullable: true })
  geographicLocation?: string;

  @ManyToOne(() => User)
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable()
  members!: User[];
}
