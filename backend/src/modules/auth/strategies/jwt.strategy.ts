import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    const usuario = await this.authService.validateUser(payload.sub);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, nickname: payload.nickname, rol: payload.rol };
  }
}
