import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  getAllUsers() {
    return this.repository.find();
  }

  getUserByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }
}
