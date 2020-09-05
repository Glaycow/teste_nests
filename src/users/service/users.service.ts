import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../shared/models/users/users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {
  }

  getAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
  }

  createUser(user: Users): Users {
    return this.userRepository.create(user);
  }
}
