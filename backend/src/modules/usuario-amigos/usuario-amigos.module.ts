import { Module } from '@nestjs/common';
import { UsuarioAmigosService } from './usuario-amigos.service';
import { UsuarioAmigosController } from './usuario-amigos.controller';

@Module({
  controllers: [UsuarioAmigosController],
  providers: [UsuarioAmigosService],
})
export class UsuarioAmigosModule {}
