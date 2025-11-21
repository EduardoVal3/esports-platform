import { Module } from '@nestjs/common';
import { UsuarioTrofeoService } from './usuario-trofeo.service';
import { UsuarioTrofeoController } from './usuario-trofeo.controller';

@Module({
  controllers: [UsuarioTrofeoController],
  providers: [UsuarioTrofeoService],
})
export class UsuarioTrofeoModule {}
