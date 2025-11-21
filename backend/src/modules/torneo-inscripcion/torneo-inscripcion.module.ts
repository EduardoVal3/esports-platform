import { Module } from '@nestjs/common';
import { TorneoInscripcionService } from './torneo-inscripcion.service';
import { TorneoInscripcionController } from './torneo-inscripcion.controller';

@Module({
  controllers: [TorneoInscripcionController],
  providers: [TorneoInscripcionService],
})
export class TorneoInscripcionModule {}
