import { Module } from '@nestjs/common';

import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/localStrategy';
import { JwtStrategy } from './service/jwtStrategy';
import { jwtConstants } from '../shared/models/jwt/iToken';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
