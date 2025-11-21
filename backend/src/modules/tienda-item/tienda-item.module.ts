import { Module } from '@nestjs/common';
import { TiendaItemService } from './tienda-item.service';
import { TiendaItemController } from './tienda-item.controller';

@Module({
  controllers: [TiendaItemController],
  providers: [TiendaItemService],
})
export class TiendaItemModule {}
