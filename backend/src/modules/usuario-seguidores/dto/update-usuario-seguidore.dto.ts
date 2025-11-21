import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioSeguidoreDto } from './create-usuario-seguidore.dto';

export class UpdateUsuarioSeguidoreDto extends PartialType(CreateUsuarioSeguidoreDto) {}
