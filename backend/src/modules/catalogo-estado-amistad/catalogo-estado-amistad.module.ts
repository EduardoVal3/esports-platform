import { Module } from '@nestjs/common';
import { CatalogoEstadoAmistadService } from './catalogo-estado-amistad.service';
import { CatalogoEstadoAmistadController } from './catalogo-estado-amistad.controller';

@Module({
  controllers: [CatalogoEstadoAmistadController],
  providers: [CatalogoEstadoAmistadService],
})
export class CatalogoEstadoAmistadModule {}
