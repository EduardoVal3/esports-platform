import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoPlataformaDto } from './create-catalogo-plataforma.dto';

export class UpdateCatalogoPlataformaDto extends PartialType(CreateCatalogoPlataformaDto) {}
