import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoGeneroDto } from './create-catalogo-genero.dto';

export class UpdateCatalogoGeneroDto extends PartialType(CreateCatalogoGeneroDto) {}
