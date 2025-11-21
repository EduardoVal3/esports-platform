import { Module } from '@nestjs/common';
import { UsuarioRedSocialService } from './usuario-red-social.service';
import { UsuarioRedSocialController } from './usuario-red-social.controller';

@Module({
  controllers: [UsuarioRedSocialController],
  providers: [UsuarioRedSocialService],
})
export class UsuarioRedSocialModule {}
