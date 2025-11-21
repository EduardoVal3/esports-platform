import { Module } from '@nestjs/common';
import { EquipoMiembroService } from './equipo-miembro.service';
import { EquipoMiembroController } from './equipo-miembro.controller';

@Module({
  controllers: [EquipoMiembroController],
  providers: [EquipoMiembroService],
})
export class EquipoMiembroModule {}
