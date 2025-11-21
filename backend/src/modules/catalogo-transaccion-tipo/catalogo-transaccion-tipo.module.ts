import { Module } from '@nestjs/common';
import { CatalogoTransaccionTipoService } from './catalogo-transaccion-tipo.service';
import { CatalogoTransaccionTipoController } from './catalogo-transaccion-tipo.controller';

@Module({
  controllers: [CatalogoTransaccionTipoController],
  providers: [CatalogoTransaccionTipoService],
})
export class CatalogoTransaccionTipoModule {}
