import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioAmigoDto } from './create-usuario-amigo.dto';

export class UpdateUsuarioAmigoDto extends PartialType(CreateUsuarioAmigoDto) {}
