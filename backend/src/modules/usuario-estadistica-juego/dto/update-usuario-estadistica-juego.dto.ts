import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioEstadisticaJuegoDto } from './create-usuario-estadistica-juego.dto';

export class UpdateUsuarioEstadisticaJuegoDto extends PartialType(CreateUsuarioEstadisticaJuegoDto) {}
