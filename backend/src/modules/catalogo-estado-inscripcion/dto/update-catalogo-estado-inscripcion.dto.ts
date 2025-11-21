import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoEstadoInscripcionDto } from './create-catalogo-estado-inscripcion.dto';

export class UpdateCatalogoEstadoInscripcionDto extends PartialType(CreateCatalogoEstadoInscripcionDto) {}
