import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../shared/models/jwt/iToken';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    console.log(jwtConstants.secret);
  }
  async validate(payload: any) {
    return  {
      username: payload.userName,
      sub: payload.id,
      name: payload.name,
      activate: payload.isActive
    }
  }
}
