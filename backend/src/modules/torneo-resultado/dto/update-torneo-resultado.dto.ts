import { PartialType } from '@nestjs/mapped-types';
import { CreateTorneoResultadoDto } from './create-torneo-resultado.dto';

export class UpdateTorneoResultadoDto extends PartialType(CreateTorneoResultadoDto) {}
