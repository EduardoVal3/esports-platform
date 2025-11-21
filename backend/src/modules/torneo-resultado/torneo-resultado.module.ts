import { Module } from '@nestjs/common';
import { TorneoResultadoService } from './torneo-resultado.service';
import { TorneoResultadoController } from './torneo-resultado.controller';

@Module({
  controllers: [TorneoResultadoController],
  providers: [TorneoResultadoService],
})
export class TorneoResultadoModule {}
