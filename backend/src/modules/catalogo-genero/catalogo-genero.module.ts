import { Module } from '@nestjs/common';
import { CatalogoGeneroService } from './catalogo-genero.service';
import { CatalogoGeneroController } from './catalogo-genero.controller';

@Module({
  controllers: [CatalogoGeneroController],
  providers: [CatalogoGeneroService],
})
export class CatalogoGeneroModule {}
