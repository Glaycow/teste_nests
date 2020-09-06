import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UserRo } from '../../shared/models/users/users.ro';
import { JwtPayload } from '../../shared/models/jwt/jwtPayload';
import { User } from '../../shared/models/users/users.entity';
import { RegistrationStatus } from '../../shared/models/jwt/registrationStatus';
import { CreateUserDto } from '../../shared/models/users/createUserDto';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
              ) {
  }
  private readonly logger = new Logger(AuthService.name);

  async registre(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.userService.registerUser(user);
    } catch (err) {
      status = {success: false, message: err};
    }
    return status;
  }

  createToken(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = {
      username: user.userName,
      sub: user.id,
      name: user.name,
      activate: user.isActive
    }
    const expiresIn = 3600;
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: expiresIn
    }
  }

  async validadeUserToken(payload: JwtPayload): Promise<User> {
    return await  this.userService.getById(payload.id);
  }

  async validateUser(email: string, password: string): Promise<UserRo> {
    const user = await this.userService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      this.logger.log('password check success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return  result;
    }
    return null;
  }
}
