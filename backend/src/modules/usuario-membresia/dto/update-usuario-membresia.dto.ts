import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioMembresiaDto } from './create-usuario-membresia.dto';

export class UpdateUsuarioMembresiaDto extends PartialType(CreateUsuarioMembresiaDto) {}
