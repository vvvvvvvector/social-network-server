import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RequestStatus } from '../utils';
import { User } from 'src/users/entities/user.entity';
import { Tables } from 'src/utils/constants';

// createForeignKeyConstraints: false -> allows insertions of same foreign keys in one column ->
// -> because one user can send multiple friend requests

@Entity({ name: Tables.FRIEND_REQUESTS })
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: User;

  @Column()
  status: RequestStatus;

  @CreateDateColumn()
  createdAt: Date;
}