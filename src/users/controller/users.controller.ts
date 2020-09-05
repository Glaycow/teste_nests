import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { Response } from 'express';
import { Users } from '../../shared/models/users/users';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAll(@Res() res: Response) {
    return this.userService.getAllUsers().then(
      (users) => {
        if (users.length == 0) {
          return res.status(HttpStatus.BAD_REQUEST).json({ 'data': 'Nenhum usuário encontrado' });
        } else {
          return res.status(HttpStatus.OK).json({ data: users });
        }
      },
    );
  }

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Res() res: Response, @Body() user: Users) {

    return res.status(HttpStatus.CREATED).json({ data: 'Criar Usuário', user: user });
  }

}
