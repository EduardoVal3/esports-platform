import { Module } from '@nestjs/common';
import { CatalogoRegionService } from './catalogo-region.service';
import { CatalogoRegionController } from './catalogo-region.controller';

@Module({
  controllers: [CatalogoRegionController],
  providers: [CatalogoRegionService],
})
export class CatalogoRegionModule {}
