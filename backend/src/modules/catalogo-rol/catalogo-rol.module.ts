import { Module } from '@nestjs/common';
import { CatalogoRolService } from './catalogo-rol.service';
import { CatalogoRolController } from './catalogo-rol.controller';

@Module({
  controllers: [CatalogoRolController],
  providers: [CatalogoRolService],
})
export class CatalogoRolModule {}
