import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameClub } from './game-club.entity';
import { System } from './system.entity';
import { User } from 'src/users/entities/user.entity';

export enum GameStatus {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 80 })
  name!: string;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column('timestamp with time zone')
  scheduledStartingTime!: Date;

  @Column('timestamp with time zone')
  scheduledEndingTime!: Date;

  @Column('timestamp with time zone')
  createdAt!: Date;

  @Column('timestamp with time zone')
  updatedAt!: Date;

  @Column()
  maxPlayers!: number;

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.SCHEDULED })
  status!: GameStatus;

  @ManyToOne(() => GameClub)
  gameClub!: GameClub;

  @ManyToOne(() => System)
  system!: System;

  @ManyToOne(() => User)
  gameMaster!: User;

  @ManyToMany(() => User)
  @JoinTable()
  players!: User[];
}
