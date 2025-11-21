import { Module } from '@nestjs/common';
import { CatalogoEstadoInscripcionService } from './catalogo-estado-inscripcion.service';
import { CatalogoEstadoInscripcionController } from './catalogo-estado-inscripcion.controller';

@Module({
  controllers: [CatalogoEstadoInscripcionController],
  providers: [CatalogoEstadoInscripcionService],
})
export class CatalogoEstadoInscripcionModule {}
