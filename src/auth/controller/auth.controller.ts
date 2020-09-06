import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { CreateUserDto } from '../../shared/models/users/createUserDto';

import { LoginUserDto } from '../../shared/models/users/loginUserDto';
import { LocalAuthGuard } from './local.auth.guard';

// @ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService ) {
  }

  @Post('register')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.authService.registre(createUserDto);
    if(!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return  res.status(HttpStatus.OK).json(result);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async login(@Response() res, @Body() login: LoginUserDto) {
    const user = await this.usersService.findByEmail(login.email);
    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found'
      });
    } else {
      const token = this.authService.createToken(user);
      return res.status(HttpStatus.OK).json(token);
    }
  }
}
