import { Module } from '@nestjs/common';
import { CatalogoTipoItemService } from './catalogo-tipo-item.service';
import { CatalogoTipoItemController } from './catalogo-tipo-item.controller';

@Module({
  controllers: [CatalogoTipoItemController],
  providers: [CatalogoTipoItemService],
})
export class CatalogoTipoItemModule {}
