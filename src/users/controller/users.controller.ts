import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';

import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/guard/jwt.auth.guard';

@ApiTags('auth')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAllUser() {
     return await this.userService.getAll();
  }
}
