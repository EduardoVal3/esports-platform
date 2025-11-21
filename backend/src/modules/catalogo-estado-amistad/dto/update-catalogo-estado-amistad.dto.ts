import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoEstadoAmistadDto } from './create-catalogo-estado-amistad.dto';

export class UpdateCatalogoEstadoAmistadDto extends PartialType(CreateCatalogoEstadoAmistadDto) {}
