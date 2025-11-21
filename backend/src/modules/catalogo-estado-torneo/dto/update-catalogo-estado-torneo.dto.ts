import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoEstadoTorneoDto } from './create-catalogo-estado-torneo.dto';

export class UpdateCatalogoEstadoTorneoDto extends PartialType(CreateCatalogoEstadoTorneoDto) {}
