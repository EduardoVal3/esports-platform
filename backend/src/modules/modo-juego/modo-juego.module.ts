import { Module } from '@nestjs/common';
import { ModoJuegoService } from './modo-juego.service';
import { ModoJuegoController } from './modo-juego.controller';

@Module({
  controllers: [ModoJuegoController],
  providers: [ModoJuegoService],
})
export class ModoJuegoModule {}
