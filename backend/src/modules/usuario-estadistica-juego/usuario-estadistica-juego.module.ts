import { Module } from '@nestjs/common';
import { UsuarioEstadisticaJuegoService } from './usuario-estadistica-juego.service';
import { UsuarioEstadisticaJuegoController } from './usuario-estadistica-juego.controller';

@Module({
  controllers: [UsuarioEstadisticaJuegoController],
  providers: [UsuarioEstadisticaJuegoService],
})
export class UsuarioEstadisticaJuegoModule {}
