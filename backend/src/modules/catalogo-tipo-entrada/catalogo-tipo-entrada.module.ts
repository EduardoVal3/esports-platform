import { Module } from '@nestjs/common';
import { CatalogoTipoEntradaService } from './catalogo-tipo-entrada.service';
import { CatalogoTipoEntradaController } from './catalogo-tipo-entrada.controller';

@Module({
  controllers: [CatalogoTipoEntradaController],
  providers: [CatalogoTipoEntradaService],
})
export class CatalogoTipoEntradaModule {}
