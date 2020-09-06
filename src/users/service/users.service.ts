import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../shared/models/users/users.entity';
import { CreateUserDto } from '../../shared/models/users/createUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async findByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(id: string, newValueUser: CreateUserDto):Promise<User | null | string> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      console.error("User doesn't exist");
      return "User doesn't exist";
    }
    await this.userRepository.update(id, newValueUser);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  public async registerUser(userDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {email} = userDto;
    let user = await this.userRepository.findOne({where: {email}});
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await  this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

}
