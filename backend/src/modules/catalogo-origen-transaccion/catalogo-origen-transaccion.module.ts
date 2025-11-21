import { Module } from '@nestjs/common';
import { CatalogoOrigenTransaccionService } from './catalogo-origen-transaccion.service';
import { CatalogoOrigenTransaccionController } from './catalogo-origen-transaccion.controller';

@Module({
  controllers: [CatalogoOrigenTransaccionController],
  providers: [CatalogoOrigenTransaccionService],
})
export class CatalogoOrigenTransaccionModule {}
