import { Module } from '@nestjs/common';
import { CatalogoEstadoTorneoService } from './catalogo-estado-torneo.service';
import { CatalogoEstadoTorneoController } from './catalogo-estado-torneo.controller';

@Module({
  controllers: [CatalogoEstadoTorneoController],
  providers: [CatalogoEstadoTorneoService],
})
export class CatalogoEstadoTorneoModule {}
