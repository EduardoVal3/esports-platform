import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneoInscripcionDto } from './create-torneo-inscripcion.dto';

export class UpdateTorneoInscripcionDto extends PartialType(CreateTorneoInscripcionDto) {}
