import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoMiembroDto } from './create-equipo-miembro.dto';

export class UpdateEquipoMiembroDto extends PartialType(CreateEquipoMiembroDto) {}
