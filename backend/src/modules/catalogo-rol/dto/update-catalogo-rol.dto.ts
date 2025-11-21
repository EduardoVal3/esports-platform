import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoRolDto } from './create-catalogo-rol.dto';

export class UpdateCatalogoRolDto extends PartialType(CreateCatalogoRolDto) {}
