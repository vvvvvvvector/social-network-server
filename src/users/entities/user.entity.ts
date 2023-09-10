import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // first arg: target relation type | second arg: inverse relation
  // if relation is not bi-directional, you can't use relations on profilesRepository (relations: ['user']), but you can use relations on usersRepository (relations: ['profile'])
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  }) // with 'cascade: true' i can save this relation with only one save call
  @JoinColumn({ name: 'profileUuid' }) // add column with foreign keys called 'profileUuid'
  profile: Profile;
}