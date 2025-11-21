import { Module } from '@nestjs/common';
import { CatalogoPlataformaService } from './catalogo-plataforma.service';
import { CatalogoPlataformaController } from './catalogo-plataforma.controller';

@Module({
  controllers: [CatalogoPlataformaController],
  providers: [CatalogoPlataformaService],
})
export class CatalogoPlataformaModule {}
