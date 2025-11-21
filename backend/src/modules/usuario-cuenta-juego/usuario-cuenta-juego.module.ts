import { Module } from '@nestjs/common';
import { UsuarioCuentaJuegoService } from './usuario-cuenta-juego.service';
import { UsuarioCuentaJuegoController } from './usuario-cuenta-juego.controller';

@Module({
  controllers: [UsuarioCuentaJuegoController],
  providers: [UsuarioCuentaJuegoService],
})
export class UsuarioCuentaJuegoModule {}
