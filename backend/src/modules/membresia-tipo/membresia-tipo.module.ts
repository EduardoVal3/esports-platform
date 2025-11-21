import { Module } from '@nestjs/common';
import { MembresiaTipoService } from './membresia-tipo.service';
import { MembresiaTipoController } from './membresia-tipo.controller';

@Module({
  controllers: [MembresiaTipoController],
  providers: [MembresiaTipoService],
})
export class MembresiaTipoModule {}
