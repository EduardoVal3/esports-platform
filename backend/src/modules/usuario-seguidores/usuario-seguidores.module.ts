import { Module } from '@nestjs/common';
import { UsuarioSeguidoresService } from './usuario-seguidores.service';
import { UsuarioSeguidoresController } from './usuario-seguidores.controller';

@Module({
  controllers: [UsuarioSeguidoresController],
  providers: [UsuarioSeguidoresService],
})
export class UsuarioSeguidoresModule {}
