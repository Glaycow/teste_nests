import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../shared/models/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
